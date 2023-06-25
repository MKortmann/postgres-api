// @ts-ignore
import Client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    console.log('index at product store!');
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      console.log(`result: ${result}`);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';

      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find a product with id: ${id}. Error: ${err}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result: any = await conn.query(sql, [p.name, p.price]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not create a product ${p.name}. Error: ${err}`);
    }
  }
  // async create(quantity: number, orderId: string, productId: string): Promise<Product> {
  //   try {
  //     const sql =
  //       'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
  //     // @ts-ignore
  //     const conn = await Client.connect();

  //     const result = await conn.query(sql, [quantity, orderId, productId]);

  //     const book = result.rows[0];

  //     conn.release();

  //     return book;
  //   } catch (err) {
  //     throw new Error(
  //       `Could not add product ${productId} to order ${orderId}. Error: ${err}`
  //     );
  //   }
  // }

  async delete(id: string): Promise<Product> {
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

  // async update(id: string, p: Product): Promise<Product> {
  //   try {
  //     const sql =
  //       'UPDATE books SET title=$1, author=$2, total_pages=$3, summary=$4 WHERE id=($5)';
  //     // @ts-ignore
  //     const conn = await Client.connect();

  //     const result = await conn.query(sql, [
  //       p.title,
  //       p.author,
  //       p.total_pages,
  //       p.summary,
  //       id,
  //     ]);

  //     const book = result.rows[0];

  //     if (result.rowCount === 0) {
  //       throw new Error(`Could not find book ${id} to update.`);
  //     }

  //     conn.release();

  //     return book;
  //   } catch (err) {
  //     throw new Error(`Could not update book ${id}. Error: ${err}`);
  //   }
  // }
}
