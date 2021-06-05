import OnlineUsers from "./OnlineUsers";
import TypeMessage from "./TypeMessage";
import "./ChatApp.css";
import React, { useEffect, useRef, useContext, useCallback } from "react";
import { io } from "socket.io-client";
import { chatContext } from "./environment/chatContext";
import DisplayMessage from "./DisplayMessage";

export default function ChatApp() {
  const {
    message,
    setSendMessage,
    connected,
    setConnection,
    receivedMessages,
    setReceivedMessages,
  } = useContext(chatContext);
  const useRefSocket = useRef();

  const sendMessage = useCallback(
    (socket) => {
      if (message.trim().length > 0) {
        socket.emit("new message", message);
        setSendMessage("");
      }
    },
    [message, setSendMessage]
  );

  const receiveMessage = useCallback(
    (socket) => {
      socket.on("new message", (msg) => {
        setReceivedMessages([...receivedMessages, msg]);
      });
    },
    [receivedMessages, setReceivedMessages]
  );

  useEffect(() => {
    if (!connected) {
      useRefSocket.current = io("http://localhost:4000");
      setConnection(!connected);
      useRefSocket.current.on("connect", () => {
        useRefSocket.current.emit('user init', useRefSocket.current.id);
      });
    }
    sendMessage(useRefSocket.current);
    receiveMessage(useRefSocket.current);
  }, [connected, sendMessage, receiveMessage, setConnection]);

  return (
    <div className="app-container">
      <div className="users-side">
        <OnlineUsers />
      </div>
      <div className="chat-box">
        <DisplayMessage />
        <TypeMessage />
      </div>
    </div>
  );
}
