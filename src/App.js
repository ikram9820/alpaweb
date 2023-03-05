import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reels from "./pages/Reels";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Router>
        <div className="bg-dark  text-white ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
