import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { request } from "../config/request";
import { setUser } from "../config/helper";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    var username = values.username;
    var password = values.password;
    if (username == "" || password == "") {
      alert("Please fill in username or password!");
      return false;
    }
    var data = {
      Username: username, //099998888
      Password: password, //"123456"
    };
    const res = await request("employee/login", "post", data);
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
        width: 500,
        margin: "auto",
        marginTop: 100,
        backgroundColor: "#eee",
        padding: 30,
        borderRadius: 10,
      }}
    >
      <Form name="normal_login" onFinish={onFinish}>
        <h1>Login</h1>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a href="">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
