import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { loadChatHistory } from "../../features/chat";
import { useEffect } from "react";

export default function ChatLog({ chatId }) {
  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.entities.chat.messages);

  useEffect(() => {
    if (chatId) dispatch(loadChatHistory(chatId));
  }, [chatHistory, dispatch]);

  return (
    <div className="chat-log">
      {chatHistory[chatId] &&
        chatHistory[chatId].map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </div>
  );
}
