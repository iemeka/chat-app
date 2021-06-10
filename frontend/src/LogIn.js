import { useState, useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";

function LogIn() {
  const { userInit } = useContext(connectionContext);
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      userInit(value.trim());
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} />
      <button>submit</button>
    </form>
  );
}

export default LogIn;
