import { useContext, useState } from "react";
import { chatContext } from "./environment/chatContext";

export default function TypeMessage() {
  const { setSendMessage } = useContext(chatContext);
  const [newMsg, setNewMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSendMessage(newMsg);
  };
  const handleTyping = (e) => {
    setNewMsg(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleTyping} />
      <button>submit</button>
    </form>
  );
}
