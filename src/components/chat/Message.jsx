import { useSelector } from "react-redux";
export default function Message({ message }) {
  const user = useSelector(state=>state.entities.auth.user)
  const isOther = message.sender._id !== user._id;
  return (
    <div className={`chat-message ${isOther&& "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${isOther&& "chatgpt"}`}>
          {isOther && <img src="chatgpt.png" />}
        </div>
        <div className="message">{message.content}</div>
      </div>
    </div>
  );
}
