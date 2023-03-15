import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { loadChatHistory } from "../../features/chat";
import { useEffect, useRef } from "react";

function ChatLog({ chatId }) {
  const chatLog = useRef();
  const dispatch = useDispatch();
  const chatHistory = useSelector(
    (state) => state.entities.chat.messages[chatId]
  );

  useEffect(() => {
    dispatch(loadChatHistory(chatId));
  }, [chatId]);

  useEffect(() => {
    if (chatLog.current)
      chatLog.current.scrollTop = chatLog.current.scrollHeight;
  }, [chatHistory]);

  return (
    <div ref={chatLog} className="chat-log">
      {chatHistory &&
        chatHistory.map((message) => (
          <Message key={message._id} message={message} />
        ))}
    </div>
      );
}
export default ChatLog;
