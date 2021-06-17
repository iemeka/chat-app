import { useState, useContext } from "react";
import { connectionContext } from "./data-providers/connectionProvider/connectionProvider";
import altImg from "./utils/altImg.jpg";
import "./App.css";
import "./LogIn.css";

function LogIn() {
  const { userInit } = useContext(connectionContext);
  const [value, setValue] = useState("");
  const [imgUrl, setImgUrl] = useState(altImg);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim().length > 0) {
      userInit(value.trim(), imgUrl);
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
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="image-uploader">
        <div className="image" style={{backgroundImage:`url("${imgUrl}")`}}></div>
        <div className="choose-file">
          <input id="img" type="file" onChange={handleUpload} />
          <label className="file-upload" for="img">
            upload image
          </label>
        </div>
      </div>

      <input placeholder="Choose a username" type="text" onChange={handleChange} />
      <button>submit</button>
    </form>
  );
}

export default LogIn;
