import "./App.css";
import { ContextProvider } from "./data-providers/connectionProvider/connectionProvider";
import Security from "./Security";

function App() {
  return (
    <div className="container">
      <ContextProvider>
        <Security />
      </ContextProvider>
      <div className="built-by">
        <a href="https://iemeka.github.io/">created by Emeka</a>
      </div>
    </div>
  );
}

export default App;
