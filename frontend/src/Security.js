import { useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import LogIn from "./LogIn";
import ChatApp from "./ChatApp";

export default function Security() {
  const { socketUsername } = useContext(connectionContext);
  return <div>{socketUsername == null ? <LogIn /> : <ChatApp />}</div>;
}
