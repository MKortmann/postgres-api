
import jwt from 'jsonwebtoken';
import express, { Request, Response } from 'express';


export const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
  try {
      const authorizationHeader = req.headers.authorization;
      const token = authorizationHeader?.split(' ')[1]!;
      console.log(`token received: ${token}`)
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
      next()
  } catch (error) {
      res.status(401);
      res.json(error);
  }
}
