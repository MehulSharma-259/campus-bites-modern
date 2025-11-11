/**
 * Handles all API calls related to fetching menu items.
 */
import { API_BASE_URL } from "../constants";
import { MenuItem, ApiError } from "../types";

export const menuService = {
  /**
   * Fetches the full list of menu items from the backend.
   */
  getMenuItems: async (): Promise<MenuItem[]> => {
    // In a real app, you'd fetch from your backend.
    // We'll return mock data for now, matching your Home.tsx structure.
    console.log("Fetching menu items...");
    // const response = await fetch(`${API_BASE_URL}/menu`);
    // if (!response.ok) {
    //   const data: ApiError = await response.json();
    //   throw new Error(data.message || "Failed to fetch menu");
    // }
    // return response.json() as Promise<MenuItem[]>;

    // --- Mock Data ---
    // Using the images you already imported in Home.tsx
    const mockData: MenuItem[] = [
      { id: "1", title: "Chola Bhatoora", price: 35, image: "/src/assets/foods/north indian.png", category: "north-indian" },
      { id: "2", title: "Paneer Butter Masala", price: 120, image: "/src/assets/foods/north indian.png", category: "north-indian" },
      { id: "3", title: "Noodles", price: 50, image: "/src/assets/foods/chineseFood.png", category: "chinese" },
      { id: "4", title: "Manchurian", price: 70, image: "/src/assets/foods/chineseFood.png", category: "chinese" },
      { id: "5", title: "Chocolate Scoop", price: 40, image: "/src/assets/foods/ice cream.png", category: "ice-cream" },
      { id: "6", title: "Oreo Ice Cream", price: 60, image: "/src/assets/foods/dark-ice-cream.png", category: "ice-cream" },
      { id: "7", title: "Chocolate Shake", price: 50, image: "/src/assets/foods/beverages.png", category: "beverages" },
      { id: "8", title: "Samosa", price: 15, image: "/src/assets/foods/north indian.png", category: "other" },
    ];

    return Promise.resolve(mockData);
    // --- End Mock Data ---
  },
};