import React, { useEffect, useState, useMemo, useCallback } from "react";
import { socket } from "../../utils/socket";

export const connectionContext = React.createContext({
  connected: false,
  messages: [],
  setMessages: () => {},
  users: [],
  sendMessage: () => {},
  socketUsername: null,
  setSocketusername: () => {},
});

export function ContextProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socketUsername, setSocketusername] = useState(null);

  const sendMessage = useCallback(
    (message) => {
      setMessages([...messages, message]);
      socket.emit("new-message", message);
    },
    [messages]
  );

  const handleConnect = useCallback((socket) => {
    socket.emit("user-init");
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id);
      setConnected(true);
      handleConnect(socket);
    });
    socket.on("disconnect", () => {
      console.log("i disconnected");
      setConnected(false);
    });
    socket.on("new-message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    socket.on("user-init", (newUser) => {
      setUsers([...users, newUser]);
    });
    return () => {
      socket.off("new-message");
      socket.off("connect");
      socket.off("user-init");
      socket.off("disconnect");
    };
  }, [handleConnect, messages, users]);

  const value = useMemo(() => {
    return { connected, messages, users, sendMessage,socketUsername, setSocketusername };
  }, [connected, messages, users, sendMessage,socketUsername, setSocketusername]);

  return (
    <connectionContext.Provider value={value}>
      {children}
    </connectionContext.Provider>
  );
}
