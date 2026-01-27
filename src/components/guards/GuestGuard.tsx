import { Navigate, Outlet } from "react-router-dom";

function GuestGuard() {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default GuestGuard;
