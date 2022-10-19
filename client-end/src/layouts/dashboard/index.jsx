import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children, linkurl) {
  return {
    key,
    icon,
    children,
    label,
    linkurl,
  };
}

const items = [
  getItem(
    "Course Infos",
    "1",
    <PieChartOutlined />,
    null,
    "/dashboard/course-infos"
  ),
  getItem(
    "Pay semester fee",
    "2",
    <DesktopOutlined />,
    null,
    "/dashboard/semester-fee-payment"
  ),
  getItem(
    "Transactions",
    "3",
    <UserOutlined />,
    null,
    "/dashboard/transactions"
  ),
];
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

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
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={(event) => navigate(`${event.item.props.linkurl}`)}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        />
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div
            className="site-layout-background"
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
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
