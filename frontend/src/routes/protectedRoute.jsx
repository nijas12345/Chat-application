import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.auth);
  console.log("users", user);

  if (!user) return <Navigate to="/login" replace />; // redirect if not logged in

  return children;
}
