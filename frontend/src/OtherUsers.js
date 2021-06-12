import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import { useContext } from "react";

export default function OtherUsers() {
  const { users, userData } = useContext(connectionContext);
  console.log(users)
  const { id } = userData;
  return (
    <div>
      {Object.keys(users).map((uid, index) =>
        uid !== id ? (
          <div key={index}>
            <img
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              src={users[uid].imgUrl}
              alt=""
            />
            <div>{users[uid].name}</div>
          </div>
        ) : null
      )}
    </div>
  );
}
