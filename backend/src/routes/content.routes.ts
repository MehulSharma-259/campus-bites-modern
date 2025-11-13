/** @format */

import express, {Request, Response} from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.js";
import prisma from "../lib/prisma.js";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const data = await prisma.menuItem.findMany();
    res.status(200).json(data);
  } catch (err: any) {
    return res.json({
      message: "failed to fetch menu items",
    });
  }
});

router.get("/cart", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if(!userId) {
      return res.status(401).json({
        message: "unauthorized"
      })
    }

    const cart = await prisma.cart.findUnique({
      where: {userId: userId},
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    res.status(200).json({cart});
  } catch (err: any) {
    return res.status(500).json({
      message: "Failed to fetch cart"
    })
  }
});

router.get("/payment", (req: Request, res: Response) => {});

export default router;
