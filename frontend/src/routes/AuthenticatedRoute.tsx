import { useAuthStore } from "@/store/authStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";
export const AuthenticatedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (isAuthenticated) {
    // Redirect authenticated users away from the login page
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  // Allow unauthenticated users to access the login page
  return <Outlet />;
};
