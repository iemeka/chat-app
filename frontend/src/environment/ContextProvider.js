import React, { useState } from "react";
import { chatContext } from "./chatContext";

function ContextProvider({ children }) {
  const [message, setSendMessage] = useState("");
  const [connected, setConnection] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const value = {
    message,
    setSendMessage,
    connected,
    setConnection,
    receivedMessages,
    setReceivedMessages,
  };
  return <chatContext.Provider value={value}>{children}</chatContext.Provider>;
}

export default ContextProvider;
