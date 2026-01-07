import { NextFunction, Request, Response } from "express";
import { verifyTokenUser } from "../utils/jwt.js";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export interface AuthRequest extends Request {
  user?: {
    id: string,
    email: string,
    universityId: string
  }
}

export async function authMiddleware(req: AuthRequest , res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "unauthorized: no token provided"
    })
    return;
  }

  const token = authHeader.split(" ")[1];
  if(!token) {
    res.status(401).json({
      message: "unauthorized"
    })
    return;
  }
  
  try {
    const payload = verifyTokenUser(token) as jwt.JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, universityId: true }
    })

    if(!user) {
      res.status(401).json({message: "unauthorized: user not found"})
      return;
    }
    req.user = user;
    next()
  } catch(err: any){

    if(err && err.name == "TokenExpiredError") {
      res.status(401).json({
        message: "unauthorized: token expired"
      })
    }

    res.status(403).json({
      message: "invalid token"
    })
    return;
  }

}