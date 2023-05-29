import express, { Request, Response } from 'express';
import { Book, BookStore } from '../models/book';

const store = new BookStore();

// this is the express handler function
const index = async (_req: Request, res: Response) => {
  const books = await store.index();
  try {
    res.send(books);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const book = async (req: Request, res: Response) => {
  const book = await store.show(req.params.id);
  console.log(`id: ${JSON.stringify(req.params.id)}`);
  console.log(`book: ${book}`);
  try {
    res.send(book);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const createBook = async (req: Request, res: Response) => {
  console.log(req);
  const book: any = {
    title: req.body.title,
    author: req.body.author,
    total_pages: req.body.total_pages,
    summary: req.body.summary,
  };
  console.log(`book created: ${JSON.stringify(book)}`);
  const result = await store.create(book);

  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const editBook = async (req: Request, res: Response) => {
  const book: any = {
    title: req.body.title,
    author: req.body.author,
    total_pages: req.body.total_pages,
    summary: req.body.summary,
  };
  const id = req.params.id;
  console.log(`id: ${id}`);
  console.log(`book: ${JSON.stringify(book)}`);
  const result = await store.update(id, book);
  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = store.delete(id);
  try {
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const book_store_routes = (app: express.Application) => {
  app.get('/books', index);
  app.get('/book/:id', book);
  app.post('/book', createBook);
  app.put('/book/:id', editBook);
  app.delete('/book/:id', deleteBook);
};

export default book_store_routes;
