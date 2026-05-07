/** @format */

import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    universityId: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulated action for presentation
    alert(`Thank you, ${formData.name}! Your message has been sent to the Campus Bites support team.`);
    setFormData({ name: "", universityId: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pt-10">
      <div className="max-w-5xl mx-auto mt-10">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-800 tracking-tight">Get in Touch</h1>
          <p className="text-gray-600 font-medium mt-2">Have an issue with your order? We're here to help.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 1. Contact Form - 2/3 Width */}
          <div className="lg:col-span-2 bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/40">
            <h2 className="text-2xl font-black text-gray-800 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Name</label>
                  <input
                    required
                    type="text"
                    className="w-full p-4 bg-white/50 border border-white/60 rounded-2xl focus:ring-2 focus:ring-[#FF4461] outline-none transition-all"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">University ID</label>
                  <input
                    required
                    type="text"
                    className="w-full p-4 bg-white/50 border border-white/60 rounded-2xl focus:ring-2 focus:ring-[#FF4461] outline-none transition-all"
                    placeholder="e.g. 220123010"
                    value={formData.universityId}
                    onChange={(e) => setFormData({ ...formData, universityId: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full p-4 bg-white/50 border border-white/60 rounded-2xl focus:ring-2 focus:ring-[#FF4461] outline-none transition-all"
                  placeholder="yourname@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2 ml-1">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full p-4 bg-white/50 border border-white/60 rounded-2xl focus:ring-2 focus:ring-[#FF4461] outline-none transition-all resize-none"
                  placeholder="How can we help you today?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-[#FF4461] text-white font-black rounded-2xl shadow-lg hover:bg-red-600 transition-all active:scale-[0.98] tracking-widest uppercase"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* 2. Info Cards - 1/3 Width */}
          <div className="space-y-6">
            
            {/* Location Card */}
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/40">
              <div className="text-[#FF4461] mb-3">📍</div>
              <h3 className="font-black text-gray-800 uppercase tracking-widest text-sm mb-2">Location</h3>
              <p className="text-gray-600 font-bold leading-relaxed">
                Main Cafeteria,<br />
                Allenhouse Institute of Technology,<br />
                Kanpur, UP
              </p>
            </div>

            {/* Hours Card */}
            <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/40">
              <div className="text-[#FF4461] mb-3">🕒</div>
              <h3 className="font-black text-gray-800 uppercase tracking-widest text-sm mb-2">Service Hours</h3>
              <ul className="text-gray-600 font-bold space-y-1 text-sm">
                <li className="flex justify-between"><span>Mon - Fri:</span> <span>8:00 - 18:00</span></li>
                <li className="flex justify-between"><span>Saturday:</span> <span>9:00 - 14:00</span></li>
                <li className="text-red-400"><span>Sunday:</span> <span>Closed</span></li>
              </ul>
            </div>

            {/* Support Card */}
            <div className="bg-gray-900 p-6 rounded-3xl shadow-xl text-white">
              <div className="text-[#FF4461] mb-3">✉️</div>
              <h3 className="font-black uppercase tracking-widest text-xs mb-2 opacity-60">Emergency Support</h3>
              <p className="font-bold text-lg mb-1">support@campusbites.com</p>
              <p className="font-medium opacity-80 text-sm">+91 98765 43210</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}