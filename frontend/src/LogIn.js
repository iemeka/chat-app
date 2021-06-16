import { useState, useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";

function LogIn() {
  const { userInit } = useContext(connectionContext);
  const [value, setValue] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      userInit(value.trim(),imgUrl);
    }
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file != null) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgUrl(reader.result);
      };
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <img width="300px" src={imgUrl} alt="ll" />
      <input type="file" onChange={handleUpload} />
      <input type="text" onChange={handleChange} />
      <button>submit</button>
    </form>
  );
}

export default LogIn;
