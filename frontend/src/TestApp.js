// import { useCallback, useContext, useEffect, useState } from "react";
// import { SocketContext } from "./context/socket";

// export default function TestApp() {
//   const socket = useContext(SocketContext);
//   const [myName, setMyName] = useState("");
//   console.log(socket)
//   const handleMsg = useCallback(
//     (msg) => {
//       console.log(msg);
//       socket.emit("I see you. Worked!");
//     },
//     [socket]
//   );

//   const getName = useCallback(() => {
//     socket.emit("my name");
//   }, [socket]);

//   useEffect(() => {
//     socket.emit("online", socket.id);
//     socket.on("message", handleMsg);
//     socket.on("my name", (Name) => {
//       setMyName(Name);
//     });

//     return () => {
//       socket.off("message", handleMsg);
//       socket.off("my name");
//     };
//   }, [socket, handleMsg]);

//   return (
//     <div>
//       <div>Who are you ? {myName}</div>
//       <button onClick={getName}>Get Name</button>
//     </div>
//   );
// }
