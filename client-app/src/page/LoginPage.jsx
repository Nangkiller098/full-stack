import { useState } from "react";
import { request } from "../config/request";
const LoginPage = () => {
  const [username, setUsername] = useState("aa");
  const [password, setPassword] = useState("123");

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChnagePassword = (event) => {
    setPassword(event.target.value);
  };

  const onLogin = async () => {
    if (username == "" || password == "") {
      alert("Please fill in username or password!");
      return false;
    }
    var data = {
      Username: username, //098521122
      Password: password, //"123456"
    };
    const res = await request("employee/login", "post", data);
    if (res) {
      if (res.error) {
        alert(res.message);
      } else {
        localStorage.setItem(
          "fullname",
          res.user.Firstname + "-" + res.user.Lastname
        );
        localStorage.getItem("fullname");
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "pink",
      }}
    >
      <input onChange={onChangeUsername} placeholder="username" />
      <br />
      <input onChange={onChnagePassword} placeholder="password" />
      <br />
      {/* <div>{username}-{password}</div> */}
      <button onClick={onLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
