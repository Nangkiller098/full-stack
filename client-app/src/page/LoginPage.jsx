import { useState } from "react";
import { request } from "../config/request";
import { setUser } from "../config/helper";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
      Username: username, //099998888
      Password: password, //"123456"
    };
    const res = await request("employee/login", "post", data);
    // alert(JSON.stringify(res))
    if (res) {
      if (res.error) {
        alert(res.message);
      } else {
        // Login success
        setUser(res.user);
        navigate("/");
      }
    }
  };

  return (
    <div
      style={{
        marginTop: 20,
        backgroundColor: "pink",
        padding: 20,
      }}
    >
      <input onChange={onChangeUsername} placeholder="username" />
      <br />
      <input onChange={onChnagePassword} placeholder="password" />
      <br />
      <button onClick={onLogin}>login</button>
    </div>
  );
};

export default LoginPage;
