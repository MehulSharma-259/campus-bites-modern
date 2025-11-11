/**
 * Manages the global state for the shopping cart.
 *
 * @format
 */

import {createContext, ReactNode, useState} from "react";
import {CartItem, MenuItem} from "../types";

// Define the shape of the context data
interface CartContextType {
  popUp: boolean,
  setPopUp: (popUp: boolean) => void,
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  getItemQuantity: (itemId: string) => number;
  totalPrice: number;
  totalItems: number;
}

// Create the context
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// Create the provider component
export function CartProvider({children}: {children: ReactNode}) {
  const [popUp, setPopUp] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (itemToAdd: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      // If new item, add it to the cart with quantity 1
      return [...prevItems, {...itemToAdd, quantity: 1}];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // If quantity drops to 0 or less, remove the item
      removeFromCart(itemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? {...item, quantity: newQuantity} : item
        )
      );
    }
  };

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
    setPopUp
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
