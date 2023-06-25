// @ts-ignore
import Client from '../database';

export type Order = {
  id?: string;
  userId: string;
  status: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM books WHERE id=($1)';

      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find book ${id}. Error: ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.userId, o.status]);

      const book = result.rows[0];

      conn.release();

      return book;
    } catch (err) {
      throw new Error(
        `Could not create order with userId: ${o.userId} and status: ${o.status}. Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
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

  // async update(id: string, p: Order): Promise<Order> {
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
