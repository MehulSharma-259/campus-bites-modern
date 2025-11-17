/** @format */

import {Navigate, Outlet} from "react-router"; // <-- Import Outlet
import {useAuth} from "../hooks/useAuth";

export function ProtectedRoute(/*{ children }: ProtectedRouteProps*/) {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
