import { useContext } from "react";
import { chatContext } from "./environment/chatContext";

export default function DisplayMessage() {
  const { receivedMessages } = useContext(chatContext);

  return (
    <div className="message-display">
      {receivedMessages.map((message) => (
        <div className="message">
          <span>{message}</span>
        </div>
      ))}
    </div>
  );
}
