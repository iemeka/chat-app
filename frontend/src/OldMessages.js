import React from "react";
import useStyle from "./customHooks/useStyle";

import "./OldMessages.css";
export default function OldMessages({ user, message, imgUrl }) {
  const style = useStyle(user);
  return (
    <div className="old-msg">
      <div className="user" style={{ order: style.order }}>
        {" "}
        <img
          style={{ width: "20px", height: "20px", borderRadius: "50%" }}
          src={imgUrl}
          alt=""
        />
        <span>{user}</span>{" "}
      </div>
      <div className="msg">
        <span
          style={{
            backgroundColor: style.backgroundColor,
            color: style.color,
          }}
          className="message"
        >
          {message}
        </span>
      </div>
    </div>
  );
}
