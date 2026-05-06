import express from "express"
import { authMiddleware, AuthRequest } from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    
    const orders = await prisma.order.findMany({
      where: {userId},
      include: {
        items: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })

    return res.json(orders);

  } catch (error: any) {
    console.error("Error fetching orders: ", error)
    res.status(500).json({
      message: "failed to fetch orders"
    })
  }
})

router.post('/place-order', async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    // 1. Fetch the user to get their universityId
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { universityId: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = await prisma.cart.findUnique({
      where: {userId},
      include: {
        items: {
          include: {menuItem: true}
        }
      } 
    })

    if(!cart || cart.items.length === 0) {
      return res.status(400).json({message: "cart is empty"})
    }

    const totalPrice = cart.items.reduce((accumulator :any, items: any) => {
      return accumulator + (items.menuItem.price * items.quantity)
    }, 0)

    // 2. Generate Custom Order ID format: "university id 6 May 2026 - 18:42"
    const now = new Date();
    const day = now.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    
    const customOrderId = `${user.universityId} ${day} ${month} ${year} - ${hours}:${minutes}`;

    const order = await prisma.$transaction(async (tx: any) => {

      const newOrder = await tx.order.create({
        data: {
          id: customOrderId, // Override default ID with our custom one
          userId,
          totalPrice, 
          status: 'PENDING', // Updated to PENDING as requested
          items: {
            create: cart.items.map((items: any) => ({
              title: items.menuItem.title,
              price: items.menuItem.price,
              quantity: items.quantity,
              image: items.menuItem.image
            }))
          }
        }
      })

      await tx.cartItem.deleteMany({
        where: {cartId: cart.id}
      })

      return newOrder

    })

    return res.status(201).json({
      message: "order placed successfully",
      orderId: order.id
    })
  } catch(err: any) {
    console.error("order err", err)
    res.status(500).json({
      message: "failed to place order"
    })
  }

})

// ==========================================
// 3. PATCH: Cancel a pending order (Student Side)
// ==========================================
router.patch('/:id/cancel', async (req: AuthRequest, res) => {
  try {
    // 1. Explicitly cast to string to satisfy TypeScript strict mode
    const orderId = req.params.id as string;
    const userId = req.user!.id;

    // 2. Safety check
    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    // First, verify the order belongs to this user and is still PENDING
    const order = await prisma.order.findFirst({
      where: { 
        id: orderId,
        userId: userId 
      }
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({ message: "Only pending orders can be cancelled" });
    }

    // Update the status to CANCELLED
    const cancelledOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' }
    });

    return res.json({
      message: "Order cancelled successfully",
      order: cancelledOrder
    });

  } catch (error: any) {
    console.error("Error cancelling order:", error);
    return res.status(500).json({ message: "Failed to cancel order" });
  }
});

export default router;