import "./App.css";
import { ContextProvider } from "./data-providers/connectionProvider/connectionProvider";
import Security from "./Security";

function App() {
  return (
    <div className="container">
      <ContextProvider>
        <Security />
      </ContextProvider>
    </div>
  );
}

export default App;
