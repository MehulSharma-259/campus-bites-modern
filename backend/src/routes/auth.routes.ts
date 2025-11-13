/** @format */

import express, {Request, Response} from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import {safeParse, z} from "zod";
import { signTokenUser } from "../utils/jwt.js";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  const requiredBody = z.object({
    name: z.string().min(5).max(50),
    email: z.email("Invalid email address"),
    universityId: z.string(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20)
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(
        /[@$!%*?&^#()[\]{}\-_=+<>]/,
        "Password must contain at least one special character"
      ),
  });

  const validateData = requiredBody.safeParse(req.body);

  if (!validateData.success) {
    return res.status(411).json({
      message: validateData.error.issues[0]?.message || "Invalid Input",
    });
  }

  const {name, email, universityId, password} = validateData.data;
  const hashedPassword = await bcrypt.hash(password, 5);

  // check for user already exists
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{email: email, universityId: universityId}]
      },
    })

    if(existingUser) {
      return res.json({
        message: "user already exists"
      })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        universityId, 
        password: hashedPassword,
        cart: {
          create: {}
        }
      },
      select: {
        id: true,
        name: true,
        universityId: true,
        email: true
      }
    })

    const token = signTokenUser({userId: user.id})
    res.status(201).json({
      user: user,
      token: token,
      message: "signed up successfully"
    })
  } catch(error: any) {
    res.status(400).json({
      message: error.message
    })
  }

});

router.post("/signin", async (req: Request, res: Response) => {
  try{
    const {universityId, password} = req.body;

    const user = await prisma.user.findUnique({
      where: {universityId: universityId}
    })

    if(!user) {
      return res.json({
        message: "invalid credentials"
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.json({
        message: "invalid credentials"
      })
    }

    const token = signTokenUser({userId: user.id});
    const userToReturn = {
      id: user.id,
      name: user.name,
      email: user.email,
      universityId: user.universityId
    }

    return res.status(201).json({
      token,
      user: userToReturn
    })
  } catch(error: any) {
    return res.json({
      message: error.message
    })
  }
})

export default router;
