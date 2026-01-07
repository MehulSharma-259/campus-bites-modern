/** @format */

import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Home } from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Orders } from "./pages/Orders";
import { Navbar } from "./components/Navbar"; // Import the new Navbar

function App() {
  return (
    <BrowserRouter>
      {/* Navbar added here so it shows on every page */}
      <Navbar /> 
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Private routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;