import { NextFunction, Request, Response } from "express";
import { verifyTokenUser } from "../utils/jwt.js";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string
}

export function authMiddleware(req: AuthRequest , res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({
      message: "unauthorized: no token provided"
    })
  }

  const token = authHeader.split(" ")[1];
  if(!token) {
    return res.status(401).json({
      message: "unauthorized"
    })
  }
  
  try {
    const data = verifyTokenUser(token) as jwt.JwtPayload;
    req.userId = data.userId;
    next()
  } catch(err: any){
    return res.status(403).json({
      message: "invalid token"
    })
  }

}