import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/slices/userSlice";
import { fetchConversationByUserId } from "../redux/slices/selectedConversationSlice";
import { clearMessages, fetchMessages } from "../redux/slices/messageSlice";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { logout } from "../redux/slices/authSlice";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
export default function Sidebar({ onOpenChat, isMobile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: users, loading, error } = useSelector((state) => state.users);
  const [activeUserId, setActiveUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserClick = async (user) => {
    setActiveUserId(user._id);
    try {
      dispatch(clearMessages());
      const result = await dispatch(
        fetchConversationByUserId(user._id)
      ).unwrap();
      const convId = result._id;
      if (convId) {
        dispatch(fetchMessages({ conversationId: convId }));
      }
      if (onOpenChat) onOpenChat();
    } catch (err) {
      console.error("Error creating/fetching conversation:", err);
    }
  };

  const handleLogout = async () => {
    const response = await axiosInstance.get("/logout");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <aside
      className={`${
        isMobile ? "w-36" : "w-64 md:w-60"
      } h-screen bg-indigo-50 shadow-lg p-2 md:p-4 flex flex-col border-r border-purple-400`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="text-indigo-700" />
          <h2 className="text-sm md:text-xl text-indigo-700 font-semibold truncate">
            Users
          </h2>
        </div>
        <LogOut
          onClick={handleLogout}
          className="text-red-500 cursor-pointer  hover:text-red-500"
          size={20}
        />
      </div>

      {/* Users list */}
      <ul className="flex-1 overflow-y-auto space-y-1">
        {loading && <p className="text-black text-xs">Loading users...</p>}
        {error && <p className="text-red-500 text-xs">Error: {error}</p>}
        {!loading && users.length === 0 && (
          <p className="text-black text-xs">No users found</p>
        )}

        {users.map((user) => {
          const isSelected = activeUserId === user._id;

          return (
            <li
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`flex items-center justify-between p-2 md:p-3 rounded-lg cursor-pointer transition ${
                isSelected
                  ? "bg-indigo-200 shadow-md ring-purple-400"
                  : "bg-white hover:bg-indigo-200"
              }`}
            >
              <span className="text-black font-medium text-xs md:text-sm truncate">
                {user.username}
              </span>
              <span
                className={`w-3 h-3 rounded-full ${
                  user.isOnline ? "bg-green-400" : "bg-gray-400"
                }`}
              ></span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
