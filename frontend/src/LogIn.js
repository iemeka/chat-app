import { useState,useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";

function LogIn() {
  const { setSocketusername, } = useContext(connectionContext);
  const [username, setUsername] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSocketusername(username);
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button>submit</button>
    </form>
  );
}

export default LogIn;

// <BrowserRouter>
//   <Route
//     exact
//     path="/"
//     render={() => (window.location = "http://localhost:4000/login.html")}
//   />
// </BrowserRouter>
