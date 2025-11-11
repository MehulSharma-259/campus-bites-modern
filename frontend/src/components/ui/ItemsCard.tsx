/* @format */

import { useCart } from "../../hooks/useCart"; // Import the hook
import { MenuItem } from "../../types"; // Import the type

interface CardProps {
  item: MenuItem; // The component now just takes the whole item
}

export function ItemCard({ item }: CardProps) {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  
  // Get the quantity for *this specific item* from the global context
  const quantity = getItemQuantity(item.id);

  const increment = () => {
    if (quantity === 0) {
      addToCart(item); // This adds it with quantity 1
    } else {
      updateQuantity(item.id, quantity + 1);
    }
  };

  const decrement = () => {
    // The updateQuantity function in the context will handle removal if q <= 0
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="bg-white shadow-xl shadow-gray-500 rounded-2xl flex items-center w-[450px] p-4">
      
      <img
        className="h-24 w-24 rounded-lg object-cover shrink-0"
        src={item.image}
        alt={item.title}
      />

      <div className="flex flex-col ml-4 gap-y-1">
        <div className="font-semibold text-xl text-gray-800">{item.title}</div>
        <div className="font-medium text-lg text-gray-600">₹{item.price}</div>
      </div>

      
      <div className="flex justify-center items-center font-semibold text-lg text-white bg-red-500 ml-auto rounded-lg shadow-md overflow-hidden translate-y-[26px]">
        
        <button
          className="cursor-pointer p-2 w-5 text-xl hover:bg-red-600 transition-colors"
          onClick={increment}
        >
          +
        </button>

        <div className="text-center min-w-[60px]">
          {quantity === 0 ? "Add" : quantity}
        </div>
        
        <button
          className="cursor-pointer p-2 mr-1 w-5 text-xl hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={decrement}
          disabled={quantity === 0}
        >
         –
        </button>

      </div>
    </div>
  );
}