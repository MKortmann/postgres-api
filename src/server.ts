import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mythical_weapon_routes from './handlers/mythical_weapons';
import book_store_routes from './handlers/books';
import user_store_routes from './handlers/users';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.get('/', (req: Request, res: Response, next: any) => {
  res.send('Hello, World!!!!');
});

mythical_weapon_routes(app);
book_store_routes(app);
user_store_routes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
