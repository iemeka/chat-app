import CurrentUser from "./CurrentUser";
import OtherUsers from "./OtherUsers";
import "./OnlineUsers.css";
import { useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";

export default function OnlineUsers() {
  const { users } = useContext(connectionContext);
  return (
    <div className="user-container">
      <div className="current-user">
        <CurrentUser />
      </div>
      <div className="users-num">
        <span>
          Active users <span id="counter">{Object.keys(users).length}</span>
        </span>
      </div>
      <div className="other-users"><OtherUsers /></div>
    </div>
  );
}
