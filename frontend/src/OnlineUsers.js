import { useContext} from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";

export default function OnlineUsers() {
  const {users} = useContext(connectionContext);
  return (
    <div>
      {Object.keys(users).map((uid, index) => (
        <div key={index}>{users[uid]}</div>
      ))}
    </div>
  );
}
