import "./App.css";
import ContextProvider from "./environment/ContextProvider";
import LogIn from "./LogIn";

function App() {
  return (
    <div className="container">
      <ContextProvider>
        <LogIn />
      </ContextProvider>
    </div>
  );
}

export default App;
