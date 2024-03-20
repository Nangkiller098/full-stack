import { useEffect, useState } from "react";
import {
  DesktopOutlined,
  AppstoreAddOutlined,
  TeamOutlined,
  UserOutlined,
  ProductOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Typography } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser, isLogin, logout } from "../../config/helper";
const { Header, Content, Sider, Footer } = Layout;

const { Title } = Typography;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "/", <AppstoreAddOutlined />),
  getItem("Customer", "customer", <TeamOutlined />),
  getItem("Employee", "employee", <TeamOutlined />),
  getItem("POS", "pos", <ShopOutlined />),
  getItem("Product", "Product", <ProductOutlined />, [
    getItem("Product", "product", <ProductOutlined />),
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
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
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
              <Typography>
                <Title level={2}>NIT Company</Title>
              </Typography>
            </div>
            <div style={{ display: "flex" }}>
              <Title level={4} type="success">
                {user?.Firstname}-{user?.Lastname}
              </Title>
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
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
