import { io } from "socket.io-client";
import { messageAdded } from "../features/chat";

const socket = io("http://localhost:3900");

export function sendMessage(data) {
  console.log(data);
  socket.emit("new message", data);
}
export function joinChat(chatId) {
  socket.emit("join chat", chatId);
}

export function setup(user) {
  socket.emit("setup", user);
}

export function onMessageRecieved(dispatch) {
  socket.on("message recieved", (newMessage) => {
    dispatch(messageAdded(newMessage));
  });
}
