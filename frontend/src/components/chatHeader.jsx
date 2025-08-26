import { useSelector } from "react-redux";

export default function ChatHeader() {
  const { selected } = useSelector((state) => state.selectConversation);
  if (!selected) return null;
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <h2 className="font-semibold text-gray-800">Conversation</h2>
      <span className="text-sm text-gray-500">
        {selected.members?.length} members
      </span>
    </div>
  );
}
