import React from "react";

export const chatContext = React.createContext({
  connected: false,
  setConnection: () => {},
  message: "",
  setSendMessage: () => { },
  receivedMessages:[],
    setReceivedMessages:()=>{},
});
