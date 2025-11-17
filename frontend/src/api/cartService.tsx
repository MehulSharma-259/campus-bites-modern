/** @format */

import axios, {isAxiosError} from "axios";
import {API_BASE_URL} from "../constants";
import {ApiError, MenuItem} from "../types";

interface BackendCartItem {
  id: string;
  quantity: number;
  menuItem: MenuItem;
}

export interface BackendCart {
  id: string | null;
  userId: string;
  items: BackendCartItem[];
}

// export const flattenBackendCartItem = (cart: BackendCart) => {
//   if (!cart || !cart.items) return [];
//   else
//     return cart.items.map((item) => ({
//       ...item.menuItem,
//       quantity: item.quantity,
//     }));
// };

export const flattenBackendCartItem = (cart: BackendCart) => {
  if (!cart || !cart.items) return [];
  return cart.items.map((item) => ({
    ...item.menuItem, // Spread all properties of menuItem
    quantity: item.quantity, // Add the quantity
  }));
};

export const cartService = {
  getCart: async (token: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const apiError = error.response.data as ApiError;
        throw new Error(apiError.message || "failed to fetch cart");
      }
      throw new Error("an unknown error occurred while fetching the cart");
    }
  },

  updateCartItem: async (
    token: string,
    menuItemId: string,
    quantity: number
  ) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/cart/item`,
        {
          menuItemId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const apiError = error.response.data as ApiError;
        throw new Error(apiError.message || "error while updating the cart");
      }

      throw new Error("an unknown error occurred while updating the cart");
    }
  },
};
