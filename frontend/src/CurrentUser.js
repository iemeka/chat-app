import { useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import "./CurrentUser.css";

export default function CurrentUser() {
  const { userData } = useContext(connectionContext);
  return (
    <div className="cur-user-sect">
      <div
        className="image"
        style={{ backgroundImage: `url("${userData.imgUrl}")` }}
      />
      <div className="cur-user-name">
        <span>{userData.name}</span>
      </div>
    </div>
  );
}
