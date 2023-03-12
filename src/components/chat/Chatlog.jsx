import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { loadChatHistory } from "../../features/chat";
import { useEffect } from "react";

function ChatLog({ chatId }) {
  const dispatch = useDispatch();
  const chatHistory = useSelector(
    (state) => state.entities.chat.messages[chatId]
  );

  useEffect(() => {
    dispatch(loadChatHistory(chatId));
  }, []);

  return (
    <div className="chat-log">
      {chatHistory &&
        chatHistory.map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </div>
  );
}
export default ChatLog;
