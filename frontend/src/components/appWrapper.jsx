// AppWrapper.jsx
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, logout } from "../redux/slices/authSlice";
import { me } from "../services/api";

export default function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // NEW: loading state

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await me();
        dispatch(loginSuccess(data));
      } catch {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return children;
}
