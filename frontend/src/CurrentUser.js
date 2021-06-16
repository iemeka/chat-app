import { useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";

export default function CurrentUser() {
  const { userData } = useContext(connectionContext);
  return (
    <div>
      <img
        style={{ width: "100px", height: "100px", borderRadius: "5px" }}
        src={userData.imgUrl}
        alt=""
      />
      <div>{userData.name}</div>
    </div>
  );
}
