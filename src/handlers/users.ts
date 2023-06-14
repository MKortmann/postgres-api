import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

// this is the express handler function
const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  try {
    // res.send(users);
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

// const create = async (_req: Request, res: Response) => {
//   const secret: string = process.env.TOKEN_SECRET!;
//   const user: any = {
//     username: _req.body.username,
//     password: _req.body.password,
//   };
//   try {
//     const newUser = await store.create(user);
//     //we pass the information we want to store in the tocen and
//     //the secret string that we want to sign with it
//     const token = jwt.sign({ user: newUser }, secret);
//     // here the client can store the token and use it for future http requests
//     res.json(token);
//   } catch (err) {
//     res.status(400);
//     res.json(err + user);
//   }
// };

const createUser = async (req: Request, res: Response) => {
  // console.log(req);
  const user: any = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  console.log(`user: ${JSON.stringify(user)}`);

  try {
  const result = await store.create(user);
  console.log(`user created: ${JSON.stringify(user)}`);

  const secret: string = process.env.TOKEN_SECRET!;
  //we pass the information we want to store in the tocen and
  //the secret string that we want to sign with it
  const token = jwt.sign({ user: user }, secret);
  // here the client can store the token and use it for future http requests
  res.json(token);

  // res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(' ')[1]!;
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
      next()
  } catch (error) {
      res.status(401)
  }
}



const authenticateUser = async (req: Request, res: Response) => {
  // console.log(req);
  const login: any = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(`user tryied to log logged: ${JSON.stringify(login)}`);


  //this part here we use to create a new product... I am adding at authenticate...
  // try {
  //   //verify the token
  //   const authorizationHeader = req.headers.authorization;
  //   const token = authorizationHeader?.split(' ')[1]!;
  //   console.log(authorizationHeader);

  //   console.log('token');
  //   console.log(token);
  //   jwt.verify(token, process.env.TOKEN_SECRET!)
  //   // jwt.verify(req.body.token, process.env.TOKEN_SECRET!)
  //   console.log("token verified")
  // } catch (err) {
  //   res.status(401)
  //   res.json(`Invalid token ${err}`)
  //   return
  // }


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
  app.post('/user/authenticate', verifyAuthToken, authenticateUser);
  // app.put('/book/:id', editBook);
  // app.delete('/book/:id', deleteBook);
};

export default user_store_routes;
