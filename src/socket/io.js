import { io } from "socket.io-client";
import { messageAdded } from "../features/chat";
import { groupCreated } from "../features/chats";

const socket = io("http://localhost:3900");

socket.on("connected", () => {
  console.log("at:io : you are connected")
});
socket.on("disconnect", () => {
  console.log("at:io : you are disconnected")
});


export function emitEvent(event,data) {
  console.log(event,data);
  socket.emit(event, data);
}
export function joinChat(chatId) {
  socket.emit("joinChat", chatId);
}


export function onMessageRecieved(dispatch) {
  socket.on("messageRecieved", (newMessage) => {
    dispatch(messageAdded(newMessage));
  });
}
export function onGroupCreated(dispatch) {
  socket.on("groupCreated", (group) => {
    dispatch(groupCreated(group));
  });
}
