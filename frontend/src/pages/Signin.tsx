/** @format */

import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { authService } from "../api/authService"; // Import the service
import { useAuth } from "../hooks/useAuth"; // Import the hook

export function Signin() {
  const [universityId, setUniversityId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // Get the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    setLoading(true);
    setError(null);

    try {
      // Call the segregated API logic
      const { token, user } = await authService.signIn({ universityId, password });

      // Use the context function to set global state and save to localStorage
      login(user, token);

      // Redirect to home page on success
      navigate("/");

    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
      setLoading(false);
    }
    // No need to set loading(false) on success, as we are navigating away
  };

  return (
    <>
      <div className="h-screen custom-bg-image flex justify-center items-center">
        <div className="bg-[#0000002d] w-full max-w-sm text-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-1" htmlFor="university-id">
                University Id
              </label>
              <input
                id="university-id"
                placeholder="Enter your University Id"
                className="bg-[#575757b7] p-2 text-white rounded-sm"
                type="text"
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold mb-1" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your Password"
                className="bg-[#575757b7] p-2 text-white rounded-sm"
                type="password" // Use password type
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <span className="text-black bg-red-600 p-2 text-sm text-center ">{error}</span>
            )}

            <button
              type="submit"
              className="bg-[#FF4461] py-2 mt-3 rounded-sm hover:bg-[#e03a55] hover:cursor-pointer transition-colors w-full disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <p className="text-[#555] font-bold text-sm text-center mt-3">
            New to CampusBites?{" "}
            <NavLink
              className={"text-[#FF4461] underline hover:text-[#e03a55]"}
              to="/signup"
            >
              Sign Up Now
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}