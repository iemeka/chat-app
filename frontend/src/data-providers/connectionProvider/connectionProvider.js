import React, { useEffect, useState, useMemo, useCallback } from "react";
import { socket } from "../../utils/socket";

export const connectionContext = React.createContext({
  connected: false,
  setConnected: () => {},
  messages: [],
  setMessages: () => {},
  users: [],
  setUsers: () => {},
  sendMessage: () => {},
  userInit: () => {},
  userName: null,
  setUserName: () => {},
  typingStatus: false,
  setTypingStatus: () => {},
});

export function ContextProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState(null);
  const [typingStatus, setTypingStatus] = useState(false);

  const sendMessage = useCallback(
    (message) => {
      setMessages([...messages, { user: "Me", type: "chat-message", message }]);
      socket.emit("send-message", {
        user: userName,
        message,
        type: "chat-message",
      });
    },
    [messages, userName]
  );

  const userInit = useCallback((value) => {
    setUserName(value);
    socket.emit("user-init", {
      user: value,
      message: " is online",
      type: "online",
    });
  }, []);

  const isTyping = useCallback((status) => {
    const typeMessage = status ? `${userName} is Typing...` :""
    socket.emit("typing-user", {
      message:typeMessage ,
      type: "typing",
    });
  }, [userName]);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("user-init", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("user-exit", (message) => {
      message.message = " is offline";
      message.type = "user-exit";
      setMessages([...messages, message]);
    });

    socket.on("send-message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("online-users", (usersOnline) => {
      setUsers(usersOnline);
    });

    socket.on("typing-user", (message) => {
      setTypingStatus(message);
    });

    return () => {
      socket.off("connect");
      socket.off("user-init");
      socket.off("send-message");
      socket.off("user-exit");
      socket.off("online-users");
      socket.off("typing-user");
    };
  }, [messages]);

  const value = useMemo(() => {
    return {
      connected,
      messages,
      users,
      sendMessage,
      userName,
      setUserName,
      userInit,
      typingStatus,
      setTypingStatus,
      isTyping,
    };
  }, [
    connected,
    messages,
    users,
    sendMessage,
    userName,
    userInit,
    typingStatus,
    isTyping,
  ]);

  return (
    <connectionContext.Provider value={value}>
      {children}
    </connectionContext.Provider>
  );
}

// when login tab is open, connection has been made already.
// and messages can be received even if the user hasn't logged in yet.
// or the socket has no name yet.
// Test !: try opening different tabs all at log in page, log in one after the other
// Test: 2try opening a tab, log in, then open another tab, login

// in all cases - even though connected, to alert that you are online, submit a user name
// fix you can disable reception of messages untill user name is defined.
