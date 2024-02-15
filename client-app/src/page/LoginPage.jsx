import { useState } from "react";

const LoginPage = () => {
  // State
  // const [stat_name,setter] = useState(default_value)
  const [username, setUsername] = useState("aa");
  const [password, setPassword] = useState("123");

  const [count, setCount] = useState(0);
  const [x, setX] = useState(0);
  const [productId, setProductId] = useState(null);
  const [price, setPrice] = useState(0.2);
  const [qty, setQty] = useState(1);
  const [arrCourse, setArrCourse] = useState([
    "C++",
    "C#",
    "Java",
    "Laravel",
    "Nestjs",
  ]);
  const [user, setUser] = useState({
    Id: 1,
    Firstname: "Sok",
    Lastname: "Dara",
    Gender: 1,
    Tel: "0968889988",
    Email: "sokdara@gmail.com",
    Salary: 8898.9,
    Status: true,
    Postion: "Web developer",
  });

  // string username = "";
  // int x = 10
  // int y = 20;
  // x = 100;
  // y = x;

  const onChangeUsername = (event) => {
    // username = event.target.value // incorrect sytax
    setUsername(event.target.value);
    // console.log(event.target.value)
  };

  const onChnagePassword = (event) => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  };

  const onLogin = () => {
    console.log(arrCourse);
    // alert(username+"-"+password);

    // using axios : for network api
    // api : Node.js
    // url:"localhost:8081/api/user/login"
    // method :"post"
    // body: {
    //     "username" : username,
    //     "password" : password,
    // }
    // return data ;
    // user
  };

  const onDecrease = () => {
    // count = count - 1
    setCount(count - 1);
  };

  const onIncrease = () => {
    setCount(count + 1);
  };

  const onReset = () => {
    setCount(0);
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
      {/* <div>{username}-{password}</div> */}
      <button onClick={onLogin}>Login</button>
      <hr />
      <h1>{arrCourse.length}</h1>
      <h1>{arrCourse[2]}</h1>
      <h1>
        {user.Firstname}-{user.Lastname}-{user.Email}
      </h1>
      <h1>{count}</h1>
      <button onClick={onDecrease}>-</button>
      <button onClick={onIncrease}>+</button>
      <button onClick={onReset}>reset</button>
    </div>
  );
};

export default LoginPage;
