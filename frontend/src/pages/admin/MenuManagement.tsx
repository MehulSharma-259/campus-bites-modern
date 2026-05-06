import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { API_BASE_URL } from '../../constants';

interface MenuItem {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function MenuManagement() {
  const { token } = useAuth();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({ title: '', price: '', image: '', category: 'north_indian' });

// Fetch Menu
  const fetchMenu = async () => {
    // 1. SAFETY CHECK: Do not fetch if there is no token yet
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/menu`, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data)) {
        setMenuItems(data);
      } else {
        console.error("Unexpected data format:", data);
        setMenuItems([]);
      }
    } catch (error) {
      console.error('Failed to fetch menu:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. DEPENDENCY ARRAY UPDATE: Re-run when the token becomes available
  useEffect(() => {
    if (token) {
      fetchMenu();
    } else {
      // If there's no token, stop loading so the UI doesn't hang
      setLoading(false); 
    }
  }, [token]);

  useEffect(() => {
    fetchMenu();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/admin/menu/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        // Optimistically remove from UI
        setMenuItems(menuItems.filter(item => item.id !== id));
      } else {
        alert("Failed to delete item");
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // Open Modal for Create or Edit
  const openModal = (item?: MenuItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, price: item.price.toString(), image: item.image, category: item.category });
    } else {
      setEditingItem(null);
      setFormData({ title: '', price: '', image: '', category: 'north_indian' });
    }
    setIsModalOpen(true);
  };

  // Handle Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingItem 
      ? `${API_BASE_URL}/admin/menu/${editingItem.id}` 
      : `${API_BASE_URL}/admin/menu`;
      
    const method = editingItem ? 'PATCH' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchMenu(); // Refresh the list
      } else {
        alert("Failed to save item");
      }
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  if (loading) return <div className="h-screen flex justify-center items-center font-bold">Loading Menu...</div>;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8 bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/30">
        <h1 className="text-3xl font-black text-gray-800">Manage Menu</h1>
        <button 
          onClick={() => openModal()}
          className="bg-[#FF4461] text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors shadow-md"
        >
          + Add New Dish
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map(item => (
          <div key={item.id} className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/40 flex flex-col">
            <div className="h-48 overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 grow flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{item.category.replace('_', ' ')}</span>
                <h3 className="text-xl font-bold text-gray-800 mt-1">{item.title}</h3>
                <p className="text-[#FF4461] font-black text-2xl mt-2">₹{item.price}</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button 
                  onClick={() => openModal(item)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-bold hover:bg-red-200 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit Dish' : 'Add New Dish'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Price (₹)</label>
                <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Image URL</label>
                <input required type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="north_indian">North Indian</option>
                  <option value="chinese">Chinese</option>
                  <option value="beverages">Beverages</option>
                  <option value="ice_cream">Ice Cream</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                <button type="submit" className="flex-1 py-3 bg-[#FF4461] text-white font-bold rounded-xl hover:bg-red-600">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}