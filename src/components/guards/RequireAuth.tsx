import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/Auth.store";

function RequireAuth() {
  const token = useAuthStore((state: any) => state.accessToken);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
