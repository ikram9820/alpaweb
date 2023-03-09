export default function Chats({ chats, onChatSelect }) {
  return (
    <>
      {chats.map((chat) => (
        <div
          onClick={() => onChatSelect(chat._id)}
          key={chat._id}
          className="users"
        >
          {chat.name}
        </div>
      ))}
    </>
  );
}
