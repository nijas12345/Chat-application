import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/homeSideBar";
import { io } from "socket.io-client";
import { updateUserStatus } from "../redux/slices/userSlice";
import Conversation from "../components/conversation";
import ChatWindow from "../components/chatWindow";

export default function Home() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  const [activeView, setActiveView] = useState("list"); // 'list' | 'chat'

  useEffect(() => {
    if (!user) return;

    const socket = io(import.meta.env.VITE_SOCKET_URL, { withCredentials: true });
    setSocket(socket);

    socket.on("connect", () => console.log("WebSocket connected:", socket.id));

    socket.on("updateStatus", (updatedUser) => {
      dispatch(
        updateUserStatus({ _id: updatedUser._id, isOnline: updatedUser.isOnline })
      );
    });

    return () => socket.disconnect();
  }, [user, dispatch]);

  if (!user) return <div>Loading...</div>;

  const handleOpenChat = () => setActiveView("chat");
  const handleBack = () => setActiveView("list");

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Desktop layout remains unchanged */}
      <div className="hidden md:flex flex-row flex-1 h-full">
        <Sidebar />
        <Conversation />
        <ChatWindow socket={socket} />
      </div>

      {/* Mobile layout */}
      <div className="flex flex-1 md:hidden h-full">
  {activeView === "list" && (
    <>
      <div className="w-40 border-r"> {/* reduced width */}
        <Sidebar onOpenChat={handleOpenChat} isMobile={true} />
      </div>
      <div className="flex-1">
        <Conversation onOpenChat={handleOpenChat} />
      </div>
    </>
  )}
  {activeView === "chat" && (
    <div className="flex-1">
      <ChatWindow socket={socket} handleBack={handleBack} />
    </div>
  )}
</div>
    </div>
  );
}

