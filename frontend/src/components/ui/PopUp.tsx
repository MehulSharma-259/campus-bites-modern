/** @format */

import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../../hooks/useCart";
import { CrossIcon } from "../icons/CrossIcon";

export function PopUp() {
  const { totalItems, totalPrice, popUp, setPopUp } = useCart();
  const navigate = useNavigate();


  // When the cart becomes empty, reset the popup to be open
  // so it appears again on the *next* item added.
  useEffect(() => {
    if (totalItems === 0) {
      setPopUp(false);
    }
  }, [totalItems]);

  const handleProceedToPay = () => {
    navigate("/cart"); // Navigate to the cart page
    setPopUp(false);  // Close the popup after clicking
  };

  const handleClose = () => {
    setPopUp(false); // Just close the popup
  };

  // --- Render Conditions ---
  // 1. If the cart is empty, render nothing.
  // 2. If the user closed the popup, render nothing.
  if (totalItems === 0 || !popUp) {
    return null;
  }

  // If we pass the checks, render the popup:
  return (
    // Main container: fixed position, custom bg, rounded, shadow, and animation
    <div className="min-h-[100px] w-full max-w-sm bg-[#E5D5FF] rounded-2xl shadow-lg fixed z-10 right-10 bottom-10 p-4 animate-slide-up">
      
      {/* Close Button: Positioned absolutely to the top-right corner */}
      <button 
        onClick={handleClose} 
        className="text-gray-600 hover:text-gray-900 absolute top-3 right-3 cursor-pointer"
        aria-label="Close popup"
      >
        <CrossIcon />
      </button>

      {/* Content Area: Uses flex justify-between to space content */}
      <div className="flex justify-between items-center mt-5">
        
        {/* Text Details */}
        <div className="flex flex-col gap-1 text-lg font-medium text-gray-800">
          <p className="font-semibold">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} added
          </p>
          <p>Total: ₹{totalPrice} </p>
        </div>

        {/* Action Button: UPDATED with custom red color from your theme */}
        <button 
          onClick={handleProceedToPay}
          className="text-lg font-semibold text-white bg-red-500 hover:bg-red-700 transition-colors rounded-lg shadow-md cursor-pointer py-2 px-4 shrink-0" // shrink-0 prevents wrapping
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
}