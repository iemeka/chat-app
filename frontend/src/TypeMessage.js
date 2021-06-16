import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import "./ChatBox.css";
import { useContext, useRef, useState } from "react";

export default function TypeMessage() {
  const { sendMessage, isTyping, typingStatus } = useContext(connectionContext);
  const [newMessage, setNewMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
    setNewMessage("");
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
    <form onSubmit={handleSubmit}>
      <span className="typing-indicator">
        {typingStatusRef.current.message}
      </span>
      <input
        className="input-box"
        type="text"
        value={newMessage}
        onChange={handleInput}
        onKeyUp={handleKeyup}
      />
      <button id="submit-btn">submit</button>
    </form>
  );
}
