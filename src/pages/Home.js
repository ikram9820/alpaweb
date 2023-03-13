import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MyChats from "../components/chat/MyChats";
import ChatRoom from "../components/chat/ChatRoom";
import Starter from "../components/chat/Starter";
import { loadChats } from "../features/chats";
import { onMessageRecieved,onGroupCreated} from "../socket/io";

export default function Home() {
  const [chatSelected, setChatSelected] = useState(null);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.entities.chats.list);
  const user = useSelector((state) => state.entities.auth.user);

  useEffect(() => {
    dispatch(loadChats());
    onMessageRecieved(dispatch);
    onGroupCreated(dispatch)
    console.log(chatSelected);
  }, [chatSelected, dispatch]);

  return (
    <div className="App">
      <MyChats chats={chats} onChatSelect={(id) => setChatSelected(id)} />

      <section className="chatbox">
        {chatSelected ? (
          <ChatRoom chatId={chatSelected} />
        ) : (
          <Starter user={user} />
        )}
      </section>
    </div>
  );
}
