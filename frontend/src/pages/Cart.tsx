/** @format */
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = [
    { id: 1, name: "Chola Bhatoora", price: 35, image: "/images/northindian.jpg" },
    { id: 2, name: "Noodles", price: 50, image: "/images/chinese.jpg" },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center custom-bg-image px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Cart</h2>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white/70 p-4 rounded-xl shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="bg-[#ff4757] text-white px-3 py-1 rounded-lg">-</button>
                <span className="px-2">1</span>
                <button className="bg-[#ff4757] text-white px-3 py-1 rounded-lg">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-gray-400/50 pt-4 flex justify-between items-center">
          <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
          <button
            onClick={() => navigate("/payment")}
            className="bg-[#ff4757] hover:bg-[#ff5c67] text-white px-6 py-2 rounded-xl shadow-md transition"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
