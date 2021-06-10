import { useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import LogIn from "./LogIn";
import ChatApp from "./ChatApp";

export default function Security() {
  const { userName } = useContext(connectionContext);
  return <div>{userName == null ? <LogIn /> : <ChatApp />}</div>;
}
