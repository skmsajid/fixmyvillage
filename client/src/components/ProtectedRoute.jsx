import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {

  const role = localStorage.getItem("role");

  // if not logged in
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // if wrong role tries to access
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}