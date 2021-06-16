import { useRef } from "react";
import "./Notification.css";
import useScroll from "./useScroll";

export default function Notification({ msg }) {
  const { user, message } = msg;
  const notiRef = useRef(null);
  useScroll(notiRef);

  return (
    <div ref={notiRef} className="notification">
      <span>{user}</span>
      <span>{message}</span>
    </div>
  );
}
