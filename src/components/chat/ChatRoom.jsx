import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import  { addMessage } from "../../features/chat";
import { joinChat } from "../../socket/io";
import ChatLog from "./Chatlog";

function ChatRoom({ chatId }) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const message = input.trim();
    if (message && message !== "")
      dispatch(addMessage({ content: message, chatId }));
  }

  useEffect(() => {
    if (chatId) joinChat(chatId);
  }, [chatId]);

  return (
    <div>
      <ChatLog chatId={chatId} />
      <div className="chat-input-holder">
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            placeholder="Write message..."
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
          />
        </form>
      </div>
    </div>
  );
}

export default ChatRoom;
