import NewMessage from "./NewMessage";
import OldMessages from "./OldMessages";
export default function Message({ msg, ind, lastInd }) {
  const { user, message } = msg;
  return (
    <div>
      {ind + 1 === lastInd ? (
        <NewMessage user={user} message={message} />
      ) : (
        <OldMessages user={user} message={message} />
      )}
    </div>
  );
}
