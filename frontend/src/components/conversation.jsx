import { useEffect } from "react";
import { Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationById } from "../redux/slices/selectedConversationSlice";
import { fetchConversations } from "../redux/slices/conversationSlice";
import { clearMessages, fetchMessages } from "../redux/slices/messageSlice";

export default function Conversation({ onOpenChat, isMobile }) {
  const dispatch = useDispatch();
  const {
    list: conversations,
    loading,
    error,
  } = useSelector((state) => state.conversations);

  const { selected } = useSelector((state) => state.selectConversation);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  const handleUserClick = (convId) => {
    dispatch(fetchConversationById(convId));
    dispatch(clearMessages());
    dispatch(fetchMessages({ conversationId: convId }));
    if (onOpenChat) onOpenChat();
  };

  return (
    <aside
      className={`${
        isMobile ? "w-40" : "w-64 md:w-60"
      } h-screen bg-indigo-50 shadow-lg p-2 flex flex-col border-r border-purple-400`}
    >
      <div className="flex items-center gap-2 mb-2">
        <Users className="text-indigo-700" />
        <h2 className="text-lg text-indigo-800 font-semibold truncate">
          Conversations
        </h2>
      </div>

      <ul className="flex-1 overflow-y-auto space-y-1">
        {loading && <p className="text-indigo-700 text-xs">Loading...</p>}
        {error && <p className="text-red-500 text-xs">Error: {error}</p>}
        {!loading && conversations.length === 0 && (
          <p className="text-indigo-700 text-xs">No conversations found</p>
        )}

        {conversations.map((conv) => {
          const isSelected = selected?._id === conv._id;
          const members = conv.members
            .map((m) => m.username || m.name)
            .join(", ");
          const lastMsgTime = conv.updatedAt
            ? new Date(conv.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";

          return (
            <li
              key={conv._id}
              onClick={() => handleUserClick(conv._id)}
              className={`flex flex-col p-2 rounded-lg cursor-pointer transition ${
                isSelected
                  ? "bg-indigo-200 shadow-md ring-indigo-400"
                  : "bg-white hover:bg-indigo-100"
              }`}
            >
              <span className="text-xs text-gray-600 truncate max-w-full">
                {members}
              </span>

              <div className="flex justify-between items-end mt-1">
                <p className="text-xs text-gray-800 truncate max-w-[75%]">
                  {conv.lastMessage || "No messages yet"}
                </p>
                <span className="text-[10px] text-gray-400 flex-shrink-0">
                  {lastMsgTime}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
