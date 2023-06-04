import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

// this is the express handler function
const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  try {
    res.send(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const user = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  console.log(`id: ${JSON.stringify(req.params.id)}`);
  console.log(`user data received: ${JSON.stringify(user)}`);
  try {
    res.send(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createUser = async (req: Request, res: Response) => {
  console.log(req);
  const user: any = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const result = await store.create(user);
  console.log(`user created: ${JSON.stringify(user)}`);

  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  // console.log(req);
  const login: any = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(`user logged: ${JSON.stringify(login)}`);
  const result = await store.authenticate(login);

  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

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

const user_store_routes = (app: express.Application) => {
  // app.get('/books', index);
  app.get('/user/:id', user);
  app.post('/user', createUser);
  app.post('/user/authenticate', authenticateUser);
  // app.put('/book/:id', editBook);
  // app.delete('/book/:id', deleteBook);
};

export default user_store_routes;
