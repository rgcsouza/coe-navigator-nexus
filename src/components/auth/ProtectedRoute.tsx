
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ 
  children,
  requiredRole
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // While checking authentication status, show nothing
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>;
  }
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If role is required and user doesn't have it
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }
  
  // User is authenticated and has required role (or no specific role is required)
  return <>{children}</>;
};
