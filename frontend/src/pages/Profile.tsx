/** @format */

import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router";

export function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/signin", { replace: true });
  };

  if (!user) {
    return (
      <div className="h-screen custom-bg-image flex justify-center items-center p-4">
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg shadow-xl">
          <p className="text-gray-900 font-medium">You are not signed in. Please sign in.</p>
        </div>
      </div>
    );
  }

  const getInitials = () => {
    if (user.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    return user.universityId.substring(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen custom-bg-image flex justify-center items-center p-4">
      <div className="bg-white/70 w-full max-w-md text-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Your Profile</h1>

        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#FF4461] w-24 h-24 rounded-full flex items-center justify-center text-4xl font-bold mb-4 border-2 border-white/80 text-white shadow-lg">
            {getInitials()}
          </div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-600 text-sm">{user.universityId}</p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          {/* Removed My Cart button as it is now in the Global Navbar */}
          <Link
            to={user ? "/orders" : "/signin"}
            className="bg-[#575757b7] p-4 rounded-xl text-center font-medium hover:bg-[#454444b7] shadow-md transition-colors text-white"
          >
            My Previous Orders
          </Link>
        </div>

        <button
          onClick={handleLogout}
          className="bg-[#FF4461] py-3 rounded-xl hover:cursor-pointer hover:bg-[#e03a55] transition-colors w-full font-bold text-lg text-white shadow-lg"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}