import { useRef } from "react";
import NewMessage from "./NewMessage";
import OldMessages from "./OldMessages";
export default function Message({ msg, ind, lastInd }) {
  const { user, message, imgUrl } = msg;
  const handleAlignRef = useRef(null);
  handleAlignRef.current = user === "me" ? "flex-end" : "flex-start";

  return (
    <div
      style={{alignSelf: handleAlignRef.current }}
    >
      {ind + 1 === lastInd ? (
        <NewMessage user={user} message={message} imgUrl={imgUrl} />
      ) : (
        <OldMessages user={user} message={message}  imgUrl={imgUrl} />
      )}
    </div>
  );
}
