/** @format */

import { useEffect, useState, useCallback } from "react";
import { orderService } from "../api/orderService";
import { useAuth } from "../hooks/useAuth";
import { Order } from "../types";
import { Link } from "react-router";

export function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrders = useCallback(async () => {
    if (!token) return;
    try {
      const data = await orderService.getOrders(token);
      // Sort orders by newest first for better presentation UX
      const sortedOrders = data.sort((a: Order, b: Order) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders();
  };

  if (loading) return <div className="h-screen flex justify-center items-center text-gray-800 font-bold">Loading Orders...</div>;
  if (error) return <div className="h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <div className="min-h-screen p-4 md:p-8 pt-10">
      <div className="max-w-4xl mx-auto mt-10">
        
        {/* Header with Refresh Button for Presentation */}
        <header className="flex justify-between items-center mb-10 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30">
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">My Orders</h1>
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-white text-gray-800 font-bold rounded-lg shadow-sm border border-gray-200 transition-all hover:bg-gray-50 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
          >
            {isRefreshing ? 'Refreshing...' : '🔄 Refresh Status'}
          </button>
        </header>

        {orders.length === 0 ? (
          <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl text-center shadow-lg text-gray-800">
            <p className="text-xl font-medium">No orders found.</p>
            <Link to="/" className="text-[#FF4461] mt-4 inline-block font-black hover:underline transition-all">
              Order something delicious!
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/40 text-gray-800 transition-transform hover:scale-[1.01]">
                
                <div className="flex justify-between items-start pb-4 border-b border-gray-200 mb-4">
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Order ID
                    </p>
                    <p className="font-mono text-xs text-gray-600">{order.id}</p>
                    <p className="text-xs text-gray-500 mt-2 font-semibold">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="text-right flex flex-col items-end">
                    {/* Enhanced Status Display */}
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-sm border ${
                      order.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200' : 
                      order.status === 'PENDING' ? 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse' : 'bg-red-100 text-red-700 border-red-200'
                    }`}>
                      {order.status === 'PENDING' ? '⏳ Pending Staff' : `✅ ${order.status}`}
                    </span>
                    
                    {order.status === 'PENDING' && (
                       <p className="text-[10px] text-gray-500 mt-2 font-medium max-w-[150px] leading-tight">
                         Will mark as completed when staff prepares your order.
                       </p>
                    )}

                    <p className="font-black text-3xl text-[#FF4461] mt-2">₹{order.totalPrice}</p>
                  </div>
                </div>

                <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-base bg-black/5 p-3 rounded-xl border border-black/5">
                      <span className="font-bold text-gray-700">
                        {item.quantity}x <span className="text-gray-900">{item.title}</span>
                      </span>
                      <span className="text-gray-900 font-black">₹{item.price * item.quantity}</span>
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