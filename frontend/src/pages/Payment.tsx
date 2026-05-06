/** @format */

import {useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth";
import {useCart} from "../hooks/useCart";
import {useState} from "react";
import {orderService} from "../api/orderService";

const Payment = () => {
  const {token} = useAuth();
  const {totalPrice, clearCart} = useCart();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Generate a dynamic UPI QR code using a free API based on the cart total
  const upiId = "campusbites@upi"; // Dummy UPI ID for the presentation
  const upiString = `upi://pay?pa=${upiId}&pn=Campus%20Bites&am=${totalPrice}&cu=INR`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}`;

  const handlePayment = async () => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      // Simulate payment delay for the presentation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call your existing backend service
      await orderService.placeOrder(token);

      clearCart();
      navigate("/orders");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-bg-image px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-lg flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
          Payment Details
        </h2>
        <p className="text-gray-800 font-medium mb-6 text-center">
          Scan the QR code below to pay
        </p>

        {/* QR Code Section */}
        <div className="flex justify-center mb-6 p-4 bg-white rounded-xl shadow-sm">
          <img 
            src={qrCodeUrl} 
            alt="Payment QR Code" 
            className="w-48 h-48"
          />
        </div>

        {/* Total Price Display */}
        <div className="text-4xl font-black text-gray-900 mb-8">
          ₹{totalPrice}
        </div>

        {error && (
          <p className="text-red-600 text-center font-bold bg-white/50 p-2 rounded w-full mb-4">
            {error}
          </p>
        )}

        {/* Simulate Payment Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full text-white py-3 text-lg font-bold rounded-lg shadow-md transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed animate-pulse"
              : "bg-[#ff4757] hover:bg-red-700 cursor-pointer"
          }`}
        >
          {loading ? "Processing Payment..." : `Simulate Payment`}
        </button>
      </div>
    </div>
  );
};

export default Payment;