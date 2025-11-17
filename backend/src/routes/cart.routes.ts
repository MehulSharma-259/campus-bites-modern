/** @format */

import express from "express";
import {authMiddleware, AuthRequest} from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    const cart = await prisma.cart.findUnique({
      where: {userId},
      include: {
        items: {
          include: {
            menuItem: true,
          },
          orderBy: {
            menuItem: {
              title: "asc",
            },
          },
        },
      },
    });

    if (!cart) {
      return res.json({id: null, userId, items: []});
    }

    res.json(cart);
  } catch (err) {
    console.error();
    res.status(500).json({message: "error fetching cart"});
  }
});

router.put("/item", async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const {menuItemId, quantity} = req.body;

    if(!menuItemId || typeof quantity != "number" || quantity < 0) {
      return res.status(400).json({message: "invalid request body"});
    }

    const userCart = await prisma.cart.upsert({
      where: {userId},
      update: {},
      create: { userId }
    })

    if(quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: userCart.id,
          menuItem: menuItemId
        }
      })
    } else {
      await prisma.cartItem.upsert({
        where: {
          cartId_menuItemId: {
            cartId: userCart.id,
            menuItemId: menuItemId
          }
        },
        update: {
          quantity: quantity
        },
        create: {
          cartId: userCart.id,
          menuItemId: menuItemId,
          quantity: quantity
        }
      })
    }

    const updatedCart = await prisma.cart.findUnique({
      where: {userId},
      include: {
        items: {
          include: {
            menuItem: true
          }
        }
      }
    })

    res.json(updatedCart);
  } catch(err) {
    console.error()
    res.status(500).json({message: "error updating cart"})
  }
})

export default router;
