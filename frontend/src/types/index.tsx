/**
 * Shared TypeScript types for the entire application.
 */

// Represents a user after authentication
export interface User {
  id: string;
  name: string;
  email: string;
  universityId: string;
}

// The response from a successful authentication API call
export interface AuthResponse {
  token: string;
  user: User;
}

// A generic API error response
export interface ApiError {
  message: string;
}

// Represents a single item on the menu
export interface MenuItem {
  id: string; // Using ID instead of title as a unique identifier
  title: string;
  price: number;
  image: string;
  category: 'north-indian' | 'chinese' | 'ice-cream' | 'beverages' | 'other';
}

// Represents an item that has been added to the cart
export interface CartItem extends MenuItem {
  quantity: number;
}