import { useEffect, useState } from "react";
import ChatLog from "../components/chat/Chatlog";
import { useSelector, useDispatch } from "react-redux";
import { addMessage, addUser, deleteMessage, deleteUser } from "../features/chat";
import { deleteChat, loadChats } from "../features/chats";
import Chats from "../components/chat/Chats";
export default function Home() {

  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState("");
  const dispatch = useDispatch();
  const chats = useSelector(state=> state.entities.chats.list)

  

  useEffect(() => {
    dispatch(loadChats({data:"load chat"}));
    dispatch(deleteChat({data:"delet chat"}));
    dispatch(addUser({data:"add user"}));
    dispatch(deleteUser({data:"delete user"}));
    dispatch(deleteMessage({data:"delete message"}));
  },[dispatch]);


  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(addMessage(input))
    setInput(" ");
  }

  return (
    <div className="App">
      <aside className="asidemenu">
        <div className="sidemenubutton">
          <span className="fw-bolder fs-5">+</span>
          Create New Group
        </div>
        <Chats chats={chats} onChatSelect={(chatId)=>setChatId(chatId)} />
      </aside>
      <section className="chatbox">
        <ChatLog chatLog={chatId} />

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
