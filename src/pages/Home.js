import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ChatLog from "../components/chat/Chatlog";
// import Users from "../components/Users";
import { reset } from "../features/auth";
import Navbar from "../components/Navbar";
import Search from "../components/chat/Search";
export default function Home() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.entities.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

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
          <span>+</span>
          Create New Group
        </div>

        <Search />
        {/* <Models
      models={models}
      currentModel={currentModel}
      onModelChange={(e) => setCurrentModel(e.target.value)}
    /> */}
      </aside>
      <section className="chatbox">
        <Navbar />

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
