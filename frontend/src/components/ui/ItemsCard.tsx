/* @format */

import { useState } from "react";

interface CardProps {
  title: string;
  price: number;
  image: string;
}

export function ItemCard({ title, image, price }: CardProps) {
  const [quantity, setQuantity] = useState<number>(0);

  const increment = () => {
    setQuantity((q) => q + 1);
  };

  const decrement = () => {
    // This logic correctly prevents going below 0
    setQuantity((q) => (q > 0 ? q - 1 : 0));
  };

  return (
    <div className="bg-white shadow-xl shadow-gray-500 rounded-2xl flex items-center w-[450px] p-4">
      
      <img
        className="h-24 w-24 rounded-lg object-cover shrink-0"
        src={image}
        alt={title}
      />

      <div className="flex flex-col ml-4 gap-y-1">
        <div className="font-semibold text-xl text-gray-800">{title}</div>
        <div className="font-medium text-lg text-gray-600">₹{price}</div>
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