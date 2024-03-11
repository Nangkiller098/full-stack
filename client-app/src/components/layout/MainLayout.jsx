import { useEffect, useState } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser, isLogin, logout } from "../../config/helper";
const { Header, Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "/", <PieChartOutlined />),
  getItem("Customer", "customer", <DesktopOutlined />),
  getItem("Employee", "employee", <DesktopOutlined />),
  getItem("Product", "Product", <TeamOutlined />, [
    getItem("Product", "product"),
    getItem("Product-stock", "product-stock"),
    getItem("Category", "category"),
  ]),
  getItem("System", "system", <UserOutlined />, [
    getItem("Order Status", "order-status"),
    getItem("Payment method", "payment-method"),
    getItem("Role", "role"),
  ]),
  getItem("Logout", "logout", <DesktopOutlined />),
];

const MainLayout = () => {
  const user = getUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin()) {
      navigate("/login");
    }
  }, [navigate]);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClickMenu = (event) => {
    if (event.key == "logout") {
      logout();
      return;
    }
    navigate(event.key);
  };

  if (!user) {
    return null;
  }

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onClickMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 5,
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{ height: 40, width: 40, backgroundColor: "#888" }}
              ></div>
              <div>Brand Name</div>
            </div>
            <div style={{ display: "flex" }}>
              <div>
                <div>
                  {user?.Firstname}-{user?.Lastname}
                </div>
              </div>
              <div
                style={{
                  height: 40,
                  width: 40,
                  backgroundColor: "#888",
                  borderRadius: 20,
                }}
              ></div>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              // background: colorBgContainer,
              // borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

// import {Outlet,Link,useNavigate, json} from "react-router-dom"
// import { getUser, isLogin, logout } from "../../config/helper";
// import { useEffect } from "react";

// const MainLayout = () => {
//     const user = getUser();

//     const navigate = useNavigate();
//     useEffect(()=>{
//         if(!isLogin()){
//             navigate("/login")
//         }
//     },[])

//     const onClickHome = () => {
//         // window.location.href="" //refresh page
//         navigate("") // no refresh page
//     }

//     const onClickLogin = () => {
//         // window.location.href="login"
//         navigate("login")
//     }

//     const onClickRegister = () => {
//         // window.location.href="login"
//         navigate("register")
//     }

//     const onLogout = () => {
//         logout();
//     }

//     if(!user){
//         return null;
//     }

//     return (
//         <div>
//             <div style={{backgroundColor:"pink",height:80}}>
//                 <div>Brand Name</div>
//                 <div>UserInfo : {user?.Id}-{user?.Firstname}-{user?.Lastname}</div>
//                 <button onClick={onLogout}>Logout</button>
//             </div>
//             <Link to={"/"}>
//                 <button>Home</button>
//             </Link>
//             <Link to={"login"}>
//                 <button>Login</button>
//             </Link>
//             <Link to={"register"}>
//                 <button>Reigster</button>
//             </Link>

//             <a href="/">Home</a>
//             <a href="login">Login</a>
//             <a href="register">Reigster</a>

//             <button onClick={onClickHome}>Btn Home</button>
//             <button onClick={onClickLogin}>Btn Login</button>
//             <button onClick={onClickRegister}>Btn Register</button>

//             <div style={{padding:10,minHeight:600}}>
//                 <Outlet />
//             </div>
//         </div>
//     )
// }

// export default MainLayout;
