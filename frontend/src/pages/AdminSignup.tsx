/** @format */
import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";
import { useNavigate } from "react-router";

export const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    universityId: "",
    adminSecret: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_BASE_URL}/auth/admin-signup`, formData);
      alert("Admin created! You can now sign in.");
      navigate("/signin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white outline-none"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Admin Email"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            required
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="University ID"
            className="w-full px-4 py-2 rounded-md bg-gray-700/80 text-white outline-none"
            onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
          />
          <div className="pt-2 border-t border-gray-400">
            <label className="block text-sm font-bold text-red-600 mb-1">SECRET ADMIN KEY</label>
            <input
              required
              type="password"
              placeholder="Enter Secret Key"
              className="w-full px-4 py-2 rounded-md bg-red-900/30 border border-red-500 text-white outline-none"
              onChange={(e) => setFormData({ ...formData, adminSecret: e.target.value })}
            />
          </div>

          {error && <p className="text-red-600 text-center font-bold">{error}</p>}

          <button
            disabled={loading}
            className="w-full bg-[#ff4757] text-white py-2 rounded-lg hover:bg-red-700 transition font-bold"
          >
            {loading ? "Creating Admin..." : "Register as Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};