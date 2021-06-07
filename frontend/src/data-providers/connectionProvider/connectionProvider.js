import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { io } from "socket.io-client";
import Messaging from "../../utils/messaging";

export const connectionContext = React.createContext({
  connected: false,
  messages: [],
  users: [],
  sendMessage: () => {},
});

export function ContextProvider({ children }) {
  const socket = io("http://localhost:4000");
  const messaging = new Messaging(socket);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const sendMessage = useCallback(
    (message) => {
      socket.emit("new-message", message);
    },
    [socket]
  );

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      messaging.handleConnect();
    });
    socket.on("disconnect", () => {
      setConnected(false);
    });
    socket.on("new-message", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    socket.on("user-init", (newUser) => {
      setUsers([...users, newUser]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const value = useMemo(() => {
    return { connected, messages, users, sendMessage};
  }, [connected, messages, users, sendMessage]);

  return (
    <connectionContext.Provider value={value}>
      {children}
    </connectionContext.Provider>
  );
}
