import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/slices/messageSlice";
import { setSelectedConversation } from "../redux/slices/selectedConversationSlice";
import { updateConversationList } from "../redux/slices/conversationSlice";

export default function ChatInput({ socket }) {
  const [message, setMessage] = useState("");
  const { selected } = useSelector((state) => state.selectConversation);
  const dispatch = useDispatch();

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim() || !socket) return;

    socket.emit("sendMessage", {
      conversationId: selected._id,
      content: message,
    });

    setMessage(""); // clear input
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("receiveMessage", ({ message, updateConversation }) => {
      dispatch(addMessage(message));
      dispatch(setSelectedConversation(updateConversation));
      dispatch(updateConversationList(updateConversation));
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [dispatch, socket]);

  return (
    <form onSubmit={handleSend} className="flex p-2 border-t bg-white">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded px-3 py-2 mr-2 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
}
