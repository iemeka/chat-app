import React, { useEffect, useState, useMemo, useCallback } from "react";
import { socket } from "../../utils/socket";
import kickSoundUrl from "../../utils/kick.wav";
import altImg from "../../utils/altImg.jpg";

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
  userData: {},
  setUserData: () => {},
  typingStatus: false,
  setTypingStatus: () => {},
});

export function ContextProvider({ children }) {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState(null);
  const [userData, setUserData] = useState({});
  const [typingStatus, setTypingStatus] = useState(false);

  const sendMessage = useCallback(
    (message) => {
      setMessages([...messages, { user: "me", type: "chat-message", message, imgUrl:userData.imgUrl  }]);
      socket.emit("send-message", {
        user: userName,
        message,
        type: "chat-message",
        imgUrl:userData.imgUrl
      });
    },
    [messages, userData.imgUrl, userName]
  );

  const userInit = useCallback((name, image) => {
    const imgUrl = image === "" ? altImg : image;
    setUserName(name);
    setUserData({ name, imgUrl, id: socket.id });
    socket.emit("user-init", {
      user: name,
      imgUrl,
      message: " is online",
      type: "online",
    });
  }, []);

  const isTyping = useCallback(
    (status) => {
      const typeMessage = status ? `${userName} is Typing...` : "";
      socket.emit("typing-user", {
        message: typeMessage,
        type: "typing",
      });
    },
    [userName]
  );

  const updateMessage = useCallback((oldMessages, newMessage) => {
    setMessages([...oldMessages, newMessage]);
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("user-init", (message) => {
      updateMessage(messages, message);
    });

    socket.on("user-exit", (message) => {
      message.message = " is offline";
      message.type = "user-exit";
      updateMessage(messages, message);
    });

    socket.on("send-message", (message) => {
      const audio = new Audio(kickSoundUrl);
      audio.play();
      updateMessage(messages, message);
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
  }, [messages, updateMessage]);

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
      userData,
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
    userData,
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
