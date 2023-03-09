import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { loadChatHistory } from "../features/chat";

export default function ChatLog({ chatId }) {
  const dispatch = useDispatch();
  const chatHistory = useSelector(state=> state.entities.chat)

  useEffect(() => {
    dispatch(loadChatHistory(chatId));
  },[chatHistory,dispatch]);

  return (
    <div className="chat-log">
      {chatHistory.messages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
}
