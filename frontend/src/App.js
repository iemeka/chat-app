import "./App.css";
import { SocketContext, socket } from "./context/socket";
import ChatApp from "./ChatApp";

function App() {
  return (
    <div className="container">
      <SocketContext.Provider value={socket}>
        <ChatApp />
      </SocketContext.Provider>
    </div>
  );
}

export default App;
