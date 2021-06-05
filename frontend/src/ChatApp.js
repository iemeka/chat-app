import OnlineUsers from "./OnlineUsers";
import ChatBox from "./ChatBox";
import "./ChatApp.css";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { SocketContext } from "./context/socket";

export default function ChatApp() {
  const url = window.location.pathname.split("/");
  const socket = useContext(SocketContext);
  const userNameRef = useRef();
  userNameRef.current = url[url.length - 1];

  const handleInitialConnect = useCallback(() => {
    socket.emit("user init", userNameRef.current);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", handleInitialConnect);
  }, [handleInitialConnect, socket]);
  return (
    <div className="app-container">
      <div className="users-side">
        <OnlineUsers />
      </div>
      <div className="chat-box-holder">
        <ChatBox />
      </div>
    </div>
  );
}
