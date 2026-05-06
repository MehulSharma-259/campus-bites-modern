import express from "express";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";
import prisma from "../lib/prisma.js";

const router = express.Router();

// MVP Hack: Require the user to be logged in, but bypass strict role-checking 
// to ensure a smooth, unblocked presentation demo.
router.use(authMiddleware);

// ==========================================
// 0. GET: Fetch all MenuItems for Admin
// ==========================================
router.get('/', async (req: AuthRequest, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return res.json(menuItems);
  } catch (error: any) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({ message: "Failed to fetch menu items" });
  }
});

// ==========================================
// 1. POST: Create a new MenuItem
// ==========================================
router.post('/', async (req: AuthRequest, res) => {
  try {
    const { title, price, image, category } = req.body;

    // Basic validation
    if (!title || !price || !image || !category) {
      return res.status(400).json({ message: "Title, price, image, and category are required" });
    }

    const newMenuItem = await prisma.menuItem.create({
      data: {
        title,
        price: parseFloat(price),
        image,
        category,
      }
    });

    return res.status(201).json({
      message: "Menu item created successfully",
      menuItem: newMenuItem
    });
  } catch (error: any) {
    console.error("Error creating menu item:", error);
    return res.status(500).json({ message: "Failed to create menu item" });
  }
});
// ==========================================
// 2. PATCH: Update an existing MenuItem by ID
// ==========================================
router.patch('/:id', async (req: AuthRequest, res) => {
  try {
    // Explicitly cast to string to satisfy TypeScript strict mode
    const id = req.params.id as string; 
    const { title, price, image, category } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: id },
      data: {
        // Only update fields that were actually sent in the request
        ...(title && { title }),
        ...(price && { price: parseFloat(price) }),
        ...(image && { image }),
        ...(category && { category }),
      }
    });

    return res.json({
      message: "Menu item updated successfully",
      menuItem: updatedMenuItem
    });
  } catch (error: any) {
    console.error("Error updating menu item:", error);
    return res.status(500).json({ message: "Failed to update menu item" });
  }
});

// ==========================================
// 3. DELETE: Remove a MenuItem by ID
// ==========================================
router.delete('/:id', async (req: AuthRequest, res) => {
  try {
    // Explicitly cast to string to satisfy TypeScript strict mode
    const id = req.params.id as string; 

    if (!id) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    await prisma.menuItem.delete({
      where: { id: id }
    });

    return res.json({
      message: "Menu item deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting menu item:", error);
    return res.status(500).json({ message: "Failed to delete menu item" });
  }
});

export default router;