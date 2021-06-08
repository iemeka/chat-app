import OnlineUsers from "./OnlineUsers";
import ChatBox from "./ChatBox";
import "./ChatApp.css";
import React from "react";

export default function ChatApp() {
  return (
    <div className="app-container">
      <div className="users-side">
        {/* <OnlineUsers /> */}
      </div>
      <div className="chat-box-holder">
        <ChatBox />
      </div>
    </div>
  );
}
