/** @format */

import { NavLink } from "react-router";

export function AdminNavbar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm font-bold uppercase tracking-widest transition-all duration-300 py-1 ${
      isActive ? "text-black" : "text-gray-600 hover:text-black"
    }`;

  const underlineStyle = (isActive: boolean) =>
    `absolute bottom-0 left-0 h-[2px] bg-[#FF4461] transition-all duration-300 ${
      isActive ? "w-full" : "w-0 group-hover:w-full"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg flex justify-between items-center pointer-events-auto">
        
        {/* Logo & Staff Badge */}
        <div className="text-2xl font-black flex items-center gap-3">
          <NavLink to="/admin/orders" className="text-gray-900 group">
            Campus<span className="text-[#FF4461]">Bites</span>
          </NavLink>
          <span className="px-2 py-1 bg-[#FF4461] text-white text-[10px] font-black rounded uppercase tracking-widest shadow-sm">
            Staff
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-10 items-center">
          <NavLink to="/admin/orders" className={linkStyle}>
            {({ isActive }) => (
              <>
                Order Queue
                <span className={underlineStyle(isActive)}></span>
              </>
            )}
          </NavLink>
          <NavLink to="/admin/menu" className={linkStyle}>
            {({ isActive }) => (
              <>
                Manage Menu
                <span className={underlineStyle(isActive)}></span>
              </>
            )}
          </NavLink>
        </div>

        {/* Action Icons / Exit */}
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            className="flex items-center gap-3 pl-4 border-l border-white/30 group text-sm font-extrabold text-gray-900 hover:text-[#FF4461] transition-colors uppercase tracking-widest"
          >
            Exit to App
          </NavLink>
        </div>
      </div>
    </nav>
  );
}