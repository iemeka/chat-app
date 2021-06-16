import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import { useContext } from "react";
import "./OtherUsers.css";

export default function OtherUsers() {
  const { users, userData } = useContext(connectionContext);
  const { id } = userData;
  return (
    <div className="hold-other-users">
      {Object.keys(users).map((uid, index) =>
        uid !== id ? (
          <div key={index} className="other-user">
            <img
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              src={users[uid].imgUrl}
              alt=""
            />
            <span>{users[uid].name}</span>
          </div>
        ) : null
      )}
    </div>
  );
}
