import { useCallback, useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import { SocketContext } from "./context/socket";

export default function ChatBox() {
  const socket = useContext(SocketContext);
  const [newMsg, setNewMsg] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);

  const handleTyping = (e) => {
    setNewMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setReceivedMsg([...receivedMsg, newMsg]);
    setNewMsg("");
    socket.emit("new message", newMsg);
  };

  const handleNewMessage = useCallback(
    (newlyReceived) => {
      setReceivedMsg([...receivedMsg, newlyReceived]);
    },
    [receivedMsg]
  );

  useEffect(() => {
    socket.on("new message", handleNewMessage);

    return () => {
      socket.off("new message", handleNewMessage);
    };
  }, [handleNewMessage, socket]);

  return (
    <div className="chat-box">
      <div className="display-message">
        {receivedMsg.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span className="typing-indicator"></span>
        <input
          className="input-box"
          type="text"
          value={newMsg}
          onChange={handleTyping}
        />
        <button id="submit-btn">submit</button>
      </form>
    </div>
  );
}
