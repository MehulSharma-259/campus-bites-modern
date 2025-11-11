/** @format */
import { useNavigate } from "react-router";
import { useCart } from "../hooks/useCart"; // Import the cart hook

const Cart = () => {
  const navigate = useNavigate();
  // Get all cart data and functions from the global context
  const { cartItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-bg-image px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

        <div className="space-y-4">
          {/* Handle empty cart */}
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white/70 p-4 rounded-xl shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="bg-[#ff4757] text-white px-3 py-1 rounded-lg"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button 
                    className="bg-[#ff4757] text-white px-3 py-1 rounded-lg"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  {/* Optional: Add a remove button */}
                   <button 
                    className="bg-gray-500 text-white px-2 py-1 rounded-lg text-xs"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Only show total and payment button if cart is not empty */}
        {cartItems.length > 0 && (
          <div className="mt-8 border-t border-gray-400/50 pt-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total: ₹{totalPrice}</h3>
            <button
              onClick={() => navigate("/payment")}
              className="bg-[#ff4757] hover:bg-[#ff5c67] text-white px-6 py-2 rounded-xl shadow-md transition"
            >
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;