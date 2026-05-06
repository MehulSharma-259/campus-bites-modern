import { useState } from "react";
import { menuService } from "../api/menuService";
import { useAuth } from "../hooks/useAuth";

export const AdminPanel = () => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: "",
    category: "other",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    setMessage("");

    try {
      await menuService.addMenuItem(token, formData);
      setMessage("Item added successfully!");
      setFormData({ title: "", price: "", image: "", category: "other" });
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Menu Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Item Title"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            required
            type="number"
            placeholder="Price (₹)"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Image URL"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          />
          <select
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="north_indian">North Indian</option>
            <option value="chinese">Chinese</option>
            <option value="beverages">Beverages</option>
            <option value="ice_cream">Ice Cream</option>
            <option value="other">Other</option>
          </select>
          <button
            disabled={loading}
            className="w-full bg-[#ff4757] text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
        {message && <p className="mt-4 text-center font-bold text-gray-800">{message}</p>}
      </div>
    </div>
  );
};