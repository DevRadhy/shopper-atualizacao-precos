import "express-async-errors";
import express, { NextFunction, Request, Response } from 'express';
import { routes } from './routes';
import { AppError } from "./errors/AppError";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(400).json({
      error: error.message,
    });
  }

  return response.status(500).json({ message: "Internal Server Error" });
})

export { app };