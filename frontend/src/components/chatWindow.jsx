import { useSelector, useDispatch } from "react-redux";
import ChatHeader from "./chatHeader";
import ChatInput from "./chatInput";
import { useEffect, useRef } from "react";
import { fetchMessages } from "../redux/slices/messageSlice";

export default function ChatWindow({ socket, handleBack }) {
  const { selected } = useSelector((state) => state.selectConversation);
  const {
    list: messages,
    page,
    hasMore,
  } = useSelector((state) => state.messages);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!socket || !selected) return;
    socket.emit("joinConversation", selected._id);
    return () => {
      socket.emit("leaveConversation", selected._id);
    };
  }, [socket, selected]);

  useEffect(() => {
    if (!selected?._id || messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [selected?._id, messages.length]);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0 && hasMore) {
      const prevHeight = e.target.scrollHeight;
      dispatch(fetchMessages({ conversationId: selected._id, page: page + 1 }))
        .unwrap()
        .then(() => {
          setTimeout(() => {
            e.target.scrollTop = e.target.scrollHeight - prevHeight;
          }, 0);
        });
    }
  };

  useEffect(() => {
    if (messages.length === 0) return;
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.senderId === user._id) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, user._id]);

  if (!selected) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col flex-1 h-screen bg-gray-50">
      {handleBack && (
        <button
          onClick={handleBack}
          className="md:hidden p-2 m-2 bg-gray-200 text-gray-700 rounded"
        >
          ← Back
        </button>
      )}

      <ChatHeader />

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col scrollbar-thin"
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const prevMsg = messages[index - 1];
            const showDateSeparator =
              !prevMsg ||
              new Date(prevMsg.createdAt).toDateString() !==
                new Date(msg.createdAt).toDateString();

            const isOwnMessage = msg.senderId === user._id;

            return (
              <div key={msg._id} className="flex flex-col">
                {showDateSeparator && (
                  <div className="text-center my-2 text-gray-500 text-xs font-semibold">
                    {formatDate(msg.createdAt)}
                  </div>
                )}
                <div
                  className={`p-2 rounded-lg shadow max-w-xs break-all whitespace-pre-wrap ${
                    isOwnMessage
                      ? "bg-blue-500 text-white self-end"
                      : "bg-white text-black self-start"
                  }`}
                >
                  <div className="grid grid-cols-[1fr_auto] gap-1 items-end">
                    <p className="break-all whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    <span className="text-[10px] text-gray-300">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400">No messages yet</p>
        )}
        <div ref={bottomRef}></div>
      </div>

      <ChatInput socket={socket} />
    </div>
  );
}
