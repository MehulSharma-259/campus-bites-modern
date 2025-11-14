import { NavLink, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth"

export const ProtectedRoutes = () => {
  const {isAuthenticated} = useAuth();

  if(!isAuthenticated) {
    return <NavLink to="/signin" replace />;
  }

  return <Outlet/>
}