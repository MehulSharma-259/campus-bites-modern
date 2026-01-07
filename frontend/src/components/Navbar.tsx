/** @format */

import { NavLink } from "react-router";
import { Profile } from "./icons/Profile";
import { CartIcon } from "./icons/Cart";
import { useAuth } from "../hooks/useAuth";

export function Navbar() {
  const { user } = useAuth();

  return (
    // Changed: bg-white/10 to bg-transparent, increased blur, and added a subtle border
    <nav className="w-full px-6 md:px-10 py-4 bg-transparent backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <NavLink to="/" className="text-gray-900 hover:text-[#FF4461] transition-colors">
            CampusBites
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-12 justify-between items-center text-gray-800">
          <NavLink to="/" className="hover:text-[#FF4461] transition-colors font-semibold">
            Menu
          </NavLink>
          <NavLink to="/" className="hover:text-[#FF4461] transition-colors font-semibold">
            About
          </NavLink>
          <NavLink to="/" className="hover:text-[#FF4461] transition-colors font-semibold">
            Contact
          </NavLink>
        </div>

        {/* Action Icons */}
        <div className="flex items-center justify-center gap-6">
          <NavLink 
            to={user ? "/cart" : "/signin"} 
            className="hover:scale-110 transition-transform text-gray-800 hover:text-[#FF4461]"
          >
            <CartIcon />
          </NavLink>

          <NavLink
            className="flex gap-2 justify-center items-center group"
            to={user ? "/profile" : "/signin"}
          >
            <div className="group-hover:scale-110 transition-transform text-gray-800 group-hover:text-[#FF4461]">
              <Profile />
            </div>
            <span className="font-bold text-gray-900 hidden sm:block">
              {user ? user.name?.split(" ")[0] : "Sign In"}
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}