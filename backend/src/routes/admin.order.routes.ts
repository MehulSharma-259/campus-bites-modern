import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

// MVP Hack: Require the user to be logged in, but bypass strict role-checking
router.use(authMiddleware);

// ==========================================
// 1. GET: Fetch ALL orders for the staff queue
// ==========================================
router.get('/', async (req: AuthRequest, res) => {
  try {
    // Notice we are NOT filtering by userId here. 
    // The staff needs to see every student's order.
    const allOrders = await prisma.order.findMany({
      include: {
        items: true // Include the nested items so staff can see what to cook
      },
      orderBy: {
        createdAt: "desc" // Newest orders first
      }
    });

    return res.json(allOrders);
  } catch (error: any) {
    console.error("Error fetching all orders: ", error);
    return res.status(500).json({ message: "Failed to fetch orders for admin" });
  }
});

// ==========================================
// 2. PATCH: Update an order's status (e.g., to COMPLETED)
// ==========================================
router.patch('/:id/status', async (req: AuthRequest, res) => {
  try {
    const orderId = req.params.id as string;
    const { status } = req.body; // We will pass { "status": "COMPLETED" } from the frontend

    if (!orderId) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status }
    });

    return res.json({
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error: any) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Failed to update order status" });
  }
});

export default router;