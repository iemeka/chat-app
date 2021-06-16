import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./NewMessage.css";
import "./OldMessages.css";
import useScroll from "./useScroll";

export default function NewMessage({ user, message, imgUrl }) {
  const [state, setState] = useState(false);
  const nodeRef = useRef(null);
  useScroll(nodeRef);

  useEffect(() => {
    setState(true);
  }, []);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={state}
      timeout={500}
      unmountOnExit
      classNames="last"
    >
      <div ref={nodeRef} className="old-msg">
        <div className="user" style={{ order: user === "me" ? 1 : null }}>
          {" "}
          <img
            style={{ width: "20px", height: "20px", borderRadius: "50%" }}
            src={imgUrl}
            alt=""
          />
          <span>{user}</span>{" "}
        </div>
        <div className="msg">
          <span className="message">{message}</span>
        </div>
      </div>
    </CSSTransition>
  );
}
