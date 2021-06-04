import { io } from "socket.io-client";

export default function Messaging() {
  const socket = io("http://localhost:4000");

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("disconnect", () => {
    console.log(socket.id);
  });

  socket.on("testing", (msg) => {
    console.log(msg);
  });
  return <div>fly</div>;
}
