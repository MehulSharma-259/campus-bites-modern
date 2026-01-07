/** @format */

import { useEffect, useState } from "react";
import { orderService } from "../api/orderService";
import { useAuth } from "../hooks/useAuth";
import { Order } from "../types";
import { Link } from "react-router";

export function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) return;
      try {
        const data = await orderService.getOrders(token);
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading) return <div className="h-screen flex justify-center items-center text-gray-800">Loading...</div>;
  if (error) return <div className="h-screen flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen custom-bg-image p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Simplified Header: Removed Back to Profile button */}
        <header className="flex justify-center items-center mb-8 bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800">My Orders</h1>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-md p-8 rounded-lg text-center shadow-lg text-gray-800">
            <p className="text-xl">No orders found.</p>
            <Link to="/" className="text-[#FF4461] mt-4 inline-block font-bold hover:underline">
              Order something delicious!
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-200 text-gray-800">
                <div className="flex justify-between items-start pb-4 border-b border-gray-300 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Order ID: <span className="font-mono text-xs">{order.id.substring(0, 15)}...</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-extrabold text-2xl text-[#FF4461] mt-1">₹{order.totalPrice}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2">Items Ordered:</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-base border-l-4 border-gray-400 pl-4 py-1">
                      <span className="font-medium">
                        {item.quantity}x {item.title}
                      </span>
                      <span className="text-gray-600 font-semibold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}