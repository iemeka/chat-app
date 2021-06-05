import { useContext, useEffect, useState } from "react";
import { SocketContext } from "./context/socket";

export default function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });
  }, [onlineUsers, socket]);
  return (
    <div>
      {Object.keys(onlineUsers).map((uid, index) => (
        <div key={index}>{onlineUsers[uid]}</div>
      ))}
    </div>
  );
}
