import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import "./TypeMessage.css";
import React, { useContext, useRef, useState } from "react";
import Icon from "@mdi/react";
import { mdiSend } from "@mdi/js";

export default function TypeMessage() {
  const { sendMessage, isTyping, typingStatus } = useContext(connectionContext);
  const [newMessage, setNewMessage] = useState("");
  const textInput = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
    textInput.current.focus();
  };

  const handleInput = (e) => {
    setNewMessage(e.target.value);
    clearTimeout(clearStatus);
    isTyping(true);
  };

  const clearStatus = () => {
    isTyping(false);
  };

  const handleKeyup = () => {
    setTimeout(clearStatus, 2000);
  };

  const typingStatusRef = useRef();
  typingStatusRef.current = typingStatus;

  return (
    <div className="type-message">
      <form onSubmit={handleSubmit}>
        <div className="hold-indicator">
          <span className="typing-indicator">
            {typingStatusRef.current.message}
          </span>
        </div>
        <div className="hold-input-box">
          <div className="input-background">
            <input
              placeholder="enter your message here"
              className="input-box"
              type="text"
              value={newMessage}
              onChange={handleInput}
              onKeyUp={handleKeyup}
              ref={textInput}
              autoFocus
            />
            <button id="submit-btn">
              Send{" "}
              <Icon className="sendIcon"
                path={mdiSend}
                title="Send"
                size={0.6}
                color="white"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
