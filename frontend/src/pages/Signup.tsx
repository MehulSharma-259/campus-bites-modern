/** @format */
import {useState} from "react";
import {NavLink, useNavigate} from "react-router";
import {authService} from "../api/authService"; // Import the service
import {useAuth} from "../hooks/useAuth"; // Import the hook

export function Signup() {
  const [universityId, setUniversityId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {login} = useAuth(); // Get the login function from context
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions

    setLoading(true);
    setError(null);

    try {
      // Call the segregated API logic
      const {token, user} = await authService.signUp({name, email, universityId, password});

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
      <div className="h-screen bg-gradient flex justify-center items-center">
        <div className="bg-[#0000002d] w-full max-w-sm text-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-1" htmlFor="name">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                id="name"
                placeholder="Enter Your Name"
                className="bg-[#575757b7] p-2 text-white rounded-sm"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-bold mb-1" htmlFor="email">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Enter Your Email"
                className="bg-[#575757b7] p-2 text-white rounded-sm"
                type="email"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold mb-1" htmlFor="university-id">
                University Id
              </label>
              <input
                onChange={(e) => setUniversityId(e.target.value)}
                id="university-id"
                placeholder="Enter Your University Id"
                className="bg-[#575757b7] p-2 text-white rounded-sm"
                type="text"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-bold mb-1" htmlFor="password">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="Enter Your Password"
                className="bg-[#575757b7] p-2 text-white rounded-sm"
                type="text"
              />
            </div>

            {error && (
              <p className="text-black bg-red-600 p-2 text-sm text-center ">{error}</p>
            ) }
            

            <button type="submit"
            className="bg-[#FF4461] py-2 mt-4 rounded-sm hover:bg-[#e03a55] hover:cursor-pointer transition-colors w-full">
              Sign Up
            </button>
          </form>
          <p className="text-[#555] font-bold text-sm text-center mt-2">
            Already a member?{" "}
            <NavLink
              className={"text-[#FF4461] underline hover:text-[#e03a55]"}
              to="/signin"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
