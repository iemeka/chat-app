import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./NewMessage.css";

export default function NewMessage({ user, message }) {
  const [state, setState] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    setState(true);
  }, []);
  return (
      <CSSTransition nodeRef={nodeRef}  in={state} timeout={500} unmountOnExit classNames="last">
        <div ref={nodeRef} >
          <span>{user} : </span>
          <span>{message}</span>
        </div>
      </CSSTransition>
  );
}
//false true
