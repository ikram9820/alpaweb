export default function Message({ message }) {
  const isgpt = message.user === "gpt";
  return (
    <div className={`chat-message ${isgpt&& "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${isgpt&& "chatgpt"}`}>
          {isgpt && <img src="chatgpt.png" />}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
}
