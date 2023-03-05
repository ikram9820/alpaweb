import { useState } from "react";
import ChatLog from "../components/chat/Chatlog";
export default function Home() {
  
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
 
  async function handleSubmit(e) {
    e.preventDefault();
    let newChatLog = [...chatLog, { user: "me", message: `${input}` }];
    setChatLog(newChatLog);
    setInput(" ");
  }

  return (
    <div className="App">
      <aside className="asidemenu">
        <div className="sidemenubutton">
          <span className="fw-bolder fs-5">+</span>
          Create New Group
        </div>
      </aside>
      <section className="chatbox">

        <ChatLog chatLog={chatLog} />

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
      </section>
    </div>
  );
}
