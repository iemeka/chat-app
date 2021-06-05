import { useCallback, useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import { SocketContext } from "./context/socket";

export default function ChatBox() {
  const socket = useContext(SocketContext);
  const [newMsg, setNewMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");

  const handleTyping = (e) => {
    setNewMsg(e.target.value);
    clearTimeout(clearStatus);
    socket.emit("typing", true);
  };
  const clearStatus = () => {
    socket.emit("typing", false);
  };
  const handleKeyup = () => {
    setTimeout(clearStatus, 2000);
  };
  const handleIsTyping = useCallback((status) => {
    setTypingStatus(status);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setReceivedMsg([...receivedMsg, `Me: ${newMsg}`]);
    socket.emit("new-message", newMsg);
    setNewMsg("");
  };

  const handleNewMessage = useCallback(
    (newlyReceived) => {
      setReceivedMsg([...receivedMsg, newlyReceived]);
    },
    [receivedMsg]
  );

  useEffect(() => {
    socket.on("new-message", handleNewMessage);
    socket.on("typing-user", handleIsTyping);

    return () => {
      socket.off("new-message", handleNewMessage);
      socket.off("typing-user", handleIsTyping);
    };
  }, [handleIsTyping, handleNewMessage, socket]);

  return (
    <div className="chat-box">
      <div className="display-message">
        {receivedMsg.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span className="typing-indicator">{typingStatus}</span>
        <input
          className="input-box"
          type="text"
          value={newMsg}
          onChange={handleTyping}
          onKeyUp={handleKeyup}
        />
        <button id="submit-btn">submit</button>
      </form>
    </div>
  );
}
