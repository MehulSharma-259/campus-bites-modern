/** @format */

import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";

// We assume your User type from frontend/src/types/index.tsx
// might have 'name' and 'universityId'.
// Adjust this based on your actual User type.

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // This clears the user and token from context and localStorage
    navigate("/signin"); // Redirect to signin page
  };

  // Fallback while user data is loading or if page is accessed without login
  if (!user) {
    return (
      <div className="h-screen custom-bg-image flex justify-center items-center text-black">
        <p>You are not signed in please signin</p>
      </div>
    );
  }

  // As an "extra thing," we can create a placeholder avatar with the user's initials
  const getInitials = () => {
    if (user.name) {
      // Assuming user has a 'name' field
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    // Fallback to university ID
    return user.universityId.substring(0, 2).toUpperCase();
  };

  return (
    <div className="h-screen custom-bg-image flex justify-center items-center p-4">
      <div className="bg-[#0000002d] w-full max-w-md text-white rounded-lg shadow-lg p-8 backdrop-blur-sm">
        
        <h1 className="text-3xl font-bold mb-6 text-center">Your Profile</h1>

        {/* --- User Details Section --- */}
        <div className="flex flex-col items-center mb-8">
          {/* Profile Picture Placeholder */}
          <div className="bg-[#FF4461] w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-4 border-2 border-white/50">
            {getInitials()}
          </div>
          
          {/* We assume 'user.name' exists. If not, you can remove this line */}
          <h2 className="text-2xl font-semibold">{user.name}</h2>

          <p className="text-gray-300 text-sm">{user.universityId}</p>
        </div>

        {/* --- Navigation Section --- */}
        <div className="flex flex-col gap-4 mb-8">
          <Link
            to="/cart"
            className="bg-[#575757b7] p-4 rounded-lg text-center font-medium hover:bg-[#6b6b6bb7] transition-colors"
          >
            My Cart
          </Link>
          <Link
            to="/orders" // Assuming you will create an /orders route
            className="bg-[#575757b7] p-4 rounded-lg text-center font-medium hover:bg-[#6b6b6bb7] transition-colors"
          >
            My Previous Orders
          </Link>
        </div>

        {/* --- Logout Button --- */}
        <button
          onClick={handleLogout}
          className="bg-[#FF4461] py-3 rounded-lg hover:bg-[#e03a55] transition-colors w-full font-bold text-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}