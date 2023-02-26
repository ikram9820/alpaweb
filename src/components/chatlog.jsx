import Message from "./Message";

export default function ChatLog({ chatLog }) {
  return (
    <div className="chat-log">
      {chatLog.map((message, index) => (
        <Message key={index} message={message} />
      ))}
    </div>
  );
}
