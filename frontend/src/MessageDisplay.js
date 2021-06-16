import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import "./MessageDisplay.css";
import { useContext } from "react";
import Message from "./Message";
import Notification from "./Notification";

export default function MessageDisplay() {
  const { messages } = useContext(connectionContext);

  return (
    <div className="display-message">
      {messages.map((message, index) => (
        <div className="msg-container" key={index}>
          {message.type !== "chat-message" ? (
            <Notification msg={message} />
          ) : (
            <Message msg={message} ind={index} lastInd={messages.length} />
          )}
        </div>
      ))}
    </div>
  );
}
