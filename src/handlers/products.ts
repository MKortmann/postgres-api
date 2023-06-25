import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../middleware/middleware';

const store = new ProductStore();

// this is the express handler function
const index = async (_req: Request, res: Response) => {
  console.log('triggering index at product store');
  const products = await store.index();
  console.log(`products: ${JSON.stringify(products)}`);
  try {
    res.send(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  console.log(`id: ${JSON.stringify(req.params.id)}`);
  console.log(`product: ${product}`);
  try {
    res.send(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createProduct = async (req: Request, res: Response) => {
  const product: any = {
    name: req.body.name,
    price: req.body.price,
  };
  console.log(`product will be created: ${JSON.stringify(product)}`);

  //the user can create a booked only if he has a token
  // try {
  //verify the token
  //BE CAREFUL: in real life the token should not be part of the body but from the request header. For many reasons as add seucrity...

  //   jwt.verify(req.body.token, process.env.TOKEN_SECRET!)
  //   console.log("token verified -  the book can be created")
  // } catch (err) {
  //   res.status(401)
  //   res.json(`Invalid token ${err}`)
  //   return
  // }

  const result = await store.create(product);

  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const addProduct = async (req: Request, res: Response) => {
//   const orderId: string = req.params.id;
//   const productId: string = req.body.productId;
//   const quantity: number = parseInt(req.body.quantity);

//   // console.log(`book will be created: ${JSON.stringify(order)}`);

//   //the user can create a booked only if he has a token
//   // try {
//   //verify the token
//   //BE CAREFUL: in real life the token should not be part of the body but from the request header. For many reasons as add seucrity...

//   //   jwt.verify(req.body.token, process.env.TOKEN_SECRET!)
//   //   console.log("token verified -  the book can be created")
//   // } catch (err) {
//   //   res.status(401)
//   //   res.json(`Invalid token ${err}`)
//   //   return
//   // }

//   try {
//     const addedProduct = await store.addProduct(quantity, orderId, productId);
//     res.send(addedProduct);
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// };

// const editBook = async (req: Request, res: Response) => {
//   const book: any = {
//     title: req.body.title,
//     author: req.body.author,
//     total_pages: req.body.total_pages,
//     summary: req.body.summary,
//   };
//   const id = req.params.id;
//   console.log(`id: ${id}`);
//   console.log(`book: ${JSON.stringify(book)}`);
//   const result = await store.update(id, book);
//   try {
//     res.send(result);
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// };

// const deleteBook = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const result = store.delete(id);
//   try {
//     res.send(result);
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// };

const product_store_routes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/product', createProduct);
  // app.post('/orders/:id/products/', addProduct);
};

export default product_store_routes;
