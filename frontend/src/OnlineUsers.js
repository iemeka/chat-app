import CurrentUser from "./CurrentUser";
import OtherUsers from "./OtherUsers";

export default function OnlineUsers() {
  return (
    <div className="content-container">
      <div className="current-user">
        <CurrentUser />
      </div>
      <div className="other-users">
        <OtherUsers />
      </div>
    </div>
  );
}
