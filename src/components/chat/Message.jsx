import { useSelector } from "react-redux";
export default function Message({ message }) {
  const user = useSelector(state=>state.entities.auth.user)
  const isOther = message.user !== user;
  return (
    <div className={`chat-message ${isOther&& "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${isOther&& "chatgpt"}`}>
          {isOther && <img src="chatgpt.png" />}
        </div>
        <div className="message">{message.body}</div>
      </div>
    </div>
  );
}
