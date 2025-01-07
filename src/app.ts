import express, { Request, Response } from 'express';
import fs from 'fs';
const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});

export default app;
