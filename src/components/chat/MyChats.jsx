import { useState } from "react";
import CreateGroup from "./CreateGroup";

function MyChats({ chats, onChatSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  let filterChats = chats;
  function handleSearch(e) {
    setSearchTerm(e.target.value.trim());
    filterChats = chats.map(
      (chat) => chat.name.toLowerCase() === searchTerm.toLowerCase()
    );
  }

  return (
    <aside className="asidemenu">
      <CreateGroup />
      <div>
        <input
          className="search-input"
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          placeholder="Search chats"
        />
      </div>
      {filterChats.map((chat) => (
        <div
          className="chats"
          onClick={() => onChatSelect(chat._id)}
          key={chat._id}
        >
          {chat.name}
        </div>
      ))}
    </aside>
  );
}

export default MyChats;
