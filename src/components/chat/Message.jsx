import { useSelector } from "react-redux";
export default function Message({ message }) {
  const user = useSelector((state) => state.entities.auth.user);
  const isOther = message.sender._id !== user._id;
  return (
    <div className={`chat-message ${isOther && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className="message">
          <div className="fw-bold"> {message.sender.name}</div>
          <div className="p-2 mb-4 ms-4">{message.content}</div>
        </div>
      </div>
    </div>
  );
}
