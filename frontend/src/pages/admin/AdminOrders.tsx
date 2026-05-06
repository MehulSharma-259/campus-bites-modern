import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../constants';

interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function AdminOrders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch all orders and filter only the PENDING ones
  const fetchPendingOrders = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) throw new Error("Failed to fetch orders");
      
      const data = await response.json();
      
      // Filter for only PENDING orders
      const pendingOrders = data.filter((order: Order) => order.status === 'PENDING');
      setOrders(pendingOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPendingOrders();
    } else {
      setLoading(false);
    }
  }, [token, fetchPendingOrders]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchPendingOrders();
  };

  // Mark order as completed
  const handleCompleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status: 'COMPLETED' })
      });

      if (response.ok) {
        // Remove the completed order from the UI instantly
        setOrders(orders.filter(order => order.id !== orderId));
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error('Error completing order:', error);
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center font-bold">Loading Queue...</div>;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30">
        <div>
          <h1 className="text-3xl font-black text-gray-800">Active Order Queue</h1>
          <p className="text-gray-600 font-medium mt-1">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} waiting
          </p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`bg-white text-gray-800 px-6 py-3 rounded-xl font-bold shadow-md border border-gray-200 transition-all ${isRefreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 active:scale-95'}`}
        >
          {isRefreshing ? 'Refreshing...' : '🔄 Refresh Queue'}
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white/70 backdrop-blur-md p-12 rounded-2xl text-center shadow-lg text-gray-800 border border-white/40">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-black mb-2">You're all caught up!</h2>
          <p className="text-gray-600">No pending orders in the queue right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border-l-4 border-l-orange-500 border-y border-r border-white/40 flex flex-col justify-between">
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-black uppercase tracking-widest rounded-md animate-pulse">
                    Action Required
                  </span>
                  <span className="text-gray-500 text-xs font-bold">
                    {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>

                {/* MASSIVE Custom Order ID for easy reading */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pickup ID</p>
                  <h2 className="text-2xl font-black text-[#FF4461] leading-tight wrap-break-word">
                    {order.id}
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="font-bold text-sm uppercase tracking-wider text-gray-500">Items to Prepare</h3>
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between text-lg bg-black/5 p-3 rounded-xl border border-black/5">
                      <span className="font-bold text-gray-800">
                        {item.quantity}x {item.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => handleCompleteOrder(order.id)}
                className="w-full bg-green-500 text-white py-4 rounded-xl font-black text-lg hover:bg-green-600 transition-all shadow-md active:scale-95 flex justify-center items-center gap-2"
              >
                <span>✅</span> Mark as Completed
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}