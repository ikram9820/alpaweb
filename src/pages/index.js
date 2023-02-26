import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import ChatLog from "@/src/components/chatlog";
import Users from "@/components/users";
import Search from "@/components/search";
import Navbar from "@/components/navbar";
import { reset } from "@/store/auth";

export default function Home(props) {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const user = props.user;
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    return () => {
      dispatch(reset());
    };
  }, [user, router, dispatch]);

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

// export async function getStaticProps(context) {
//   const user = useSelector((state) => state.entities.auth.user);
//   return { props: { user } };
// }

export async function getServerSideProps(context) {
  const user = useSelector((state) => state.entities.auth.user);
  return {
    props: { user },
  };
}
