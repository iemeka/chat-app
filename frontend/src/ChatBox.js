import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import "./ChatBox.css";
import { useContext, useState } from "react";

export default function ChatBox() {
  const { sendMessage, messages} = useContext(connectionContext);
  const [newMessage, setNewMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(newMessage);
  };
  const handleInput = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="chat-box">
      <div className="display-message">
        {messages.map((message, index) => (
          <div key={`${index}+${message}`}>{message}</div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span className="typing-indicator">{}</span>
        <input
          className="input-box"
          type="text"
          value={newMessage}
          onChange={handleInput}
        />
        <button id="submit-btn">submit</button>
      </form>
    </div>
  );
}
