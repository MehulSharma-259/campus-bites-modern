/** @format */

import {BrowserRouter, Route, Routes, Outlet} from "react-router"; // Note: Changed to react-router-dom for Outlet support
import "./App.css";
import {Signin} from "./pages/Signin";
import {Signup} from "./pages/Signup";
import {Home} from "./pages/Home";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact"
import {Profile} from "./pages/Profile";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {Orders} from "./pages/Orders";
import {Navbar} from "./components/Navbar";
import AdminLayout from "./components/AdminLayout";
import MenuManagement from "./pages/admin/MenuManagement";
import AdminOrders from "./pages/admin/AdminOrders";
import About from "./pages/About";

// Wrapper for the student-facing side so the normal Navbar doesn't bleed into the Admin side
const StudentLayout = () => {
  return (
    <div className="pt-20 min-h-screen custom-bg-image selection:bg-[#FF4461] selection:text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================================== */}
        {/* STUDENT ROUTES                             */}
        {/* ========================================== */}
        <Route element={<StudentLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Route>

        {/* ========================================== */}
        {/* ADMIN/STAFF ROUTES                         */}
        {/* ========================================== */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="menu" element={<MenuManagement />} />

          {/* REPLACE the placeholder with this line: */}
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
