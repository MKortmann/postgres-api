import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!!!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
