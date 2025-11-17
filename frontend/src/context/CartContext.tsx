/**
 * Manages the global state for the shopping cart.
 *
 * @format
 */

import {createContext, ReactNode, useCallback, useEffect, useState} from "react";
import {CartItem, MenuItem} from "../types";
import { useAuth } from "../hooks/useAuth";
import { cartService, flattenBackendCartItem } from "../api/cartService";

// Define the shape of the context data
interface CartContextType {
  popUp: boolean,
  setPopUp: (popUp: boolean) => void,
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, newQuantity: number) => Promise<void>;
  getItemQuantity: (itemId: string) => number;
  totalPrice: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  clearCart: () => void
}

// Create the context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Create the provider component
export function CartProvider({children}: {children: ReactNode}) {
  const [popUp, setPopUp] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const fetchCart = useCallback(async () => {
    if(!token)
      return;

    setLoading(true);
    setError(null);

    try {
      const backendCart = await cartService.getCart(token);
      const flattenedItems = flattenBackendCartItem(backendCart);
      setCartItems(flattenedItems);

    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [token])

  useEffect(()=> {
    if(token) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [token, fetchCart])
  
  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if(!token) {
      setError("Please login to update your cart")
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedBackendCart = await cartService.updateCartItem(token, itemId, newQuantity);
      const flattenedItems = flattenBackendCartItem(updatedBackendCart);
      setCartItems(flattenedItems);
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (itemToAdd: MenuItem) => {
    const currentQuantity = getItemQuantity(itemToAdd.id);
    await updateQuantity(itemToAdd.id, currentQuantity + 1);
  };

  const removeFromCart = async (itemId: string) => {
    await updateQuantity(itemId, 0)
  };

  const clearCart = () => {
    setCartItems([]);
  }


  const getItemQuantity = (itemId: string): number => {
    return cartItems.find((item) => item.id === itemId)?.quantity || 0;
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    totalPrice,
    totalItems,
    popUp,
    setPopUp,
    clearCart,
    loading,
    error
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
