// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

export type Book = {
  id: number;
  title: string;
  author: string;
  total_pages: number;
  summary: string;
};
export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

const users: User[] = [];

export class UserStore {
  async index(): Promise<Book[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM books';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get books. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Book> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [id]);

      console.log(`user show: ${JSON.stringify(result.rows[0])}`);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (first_name, last_name, user_name, email, salt, password ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const salt = await bcrypt.genSalt(10);

      const hash = bcrypt.hashSync(u.password + salt, parseInt('10'));

      const result = await conn.query(sql, [
        u.firstname,
        u.lastname,
        u.username,
        u.email,
        salt,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Unable to create a user ${u.username}. Error: ${err}`);
    }
  }

  async authenticate(u: any): Promise<User | null> {
    const sql = 'SELECT password, salt FROM users WHERE user_name=($1)';
    // @ts-ignore
    const conn = await Client.connect();

    const result = await conn.query(sql, [u.username]);

    if (result.rows.length) {
      const user = result.rows[0];
      console.log(`user.salt: ${user.salt}`);
      const hash = bcrypt.hashSync(u.password + user.salt, 10);
      console.log('user.password: ' + user.password);
      console.log('hash: ' + hash);
      console.log(JSON.stringify(bcrypt.compareSync(hash, user.password)));

      if (await bcrypt.compare(hash, user.password)) {
        console.log('compared! Matched!');
        return user;
      }
    }
    console.log('password not matched!');
    return null;
  }

  async delete(id: string): Promise<Book> {
    try {
      const sql = 'DELETE FROM books WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not delete book ${id}. Error: ${err}`);
    }
  }

  async update(id: string, b: Book): Promise<Book> {
    try {
      const sql =
        'UPDATE books SET title=$1, author=$2, total_pages=$3, summary=$4 WHERE id=($5)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        b.title,
        b.author,
        b.total_pages,
        b.summary,
        id,
      ]);

      const book = result.rows[0];

      if (result.rowCount === 0) {
        throw new Error(`Could not find book ${id} to update.`);
      }

      conn.release();

      return book;
    } catch (err) {
      throw new Error(`Could not update book ${id}. Error: ${err}`);
    }
  }
}
