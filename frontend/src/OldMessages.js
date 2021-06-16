import React from "react";

import "./OldMessages.css";
export default function OldMessages({ user, message, imgUrl }) {
  return (
    <div className="old-msg">
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
  );
}
