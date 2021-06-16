import "./ChatBox.css";
import MessageDisplay from "./MessageDisplay";
import TypeMessage from "./TypeMessage";

export default function ChatBox() {
  return (
    <div className="chat-box">
      <MessageDisplay />
      <TypeMessage />
    </div>
  );
}
