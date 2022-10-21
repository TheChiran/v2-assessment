import {
  DesktopOutlined,
  PieChartOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CloseOutlined,
  BookOutlined,
  MoneyCollectOutlined,
  AuditOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Breadcrumb, Layout, Menu, Avatar, Dropdown, Drawer } from "antd";
import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
import { connect } from "react-redux";

function getItem(label, key, icon, children, linkurl) {
  return {
    key,
    icon,
    children,
    label,
    linkurl,
  };
}

const DashboardLayout = (props) => {
  const items = [
    getItem(
      "Course Infos",
      "1",
      <BookOutlined />,
      null,
      "/dashboard/course-infos"
    ),
    getItem(
      "Pay semester fee",
      "2",
      <MoneyCollectOutlined />,
      null,
      "/dashboard/semester-fee-payment"
    ),
    getItem(
      "Transactions",
      "3",
      <AuditOutlined />,
      null,
      "/dashboard/transactions"
    ),
    props?.student?.current_semester === 12 &&
    props?.student?.dueSemesterList?.length > 1
      ? getItem(
          "Due List",
          "4",
          <DollarCircleOutlined />,
          null,
          "/dashboard/due-list"
        )
      : null,
  ];

  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const hideDrawer = () => {
    setOpen(false);
  };

  const dropdownMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => navigate("/auth/login")}
            >
              Logout
            </a>
          ),
        },
      ]}
    />
  );

  const getCurrentActiveLink = () => {
    const current = items.filter((item) => {
      return item?.linkurl === location.pathname;
    });

    return current[0]?.key | 1;
  };

  const navigateURL = (url) => {
    hideDrawer();
    navigate(`${url}`);
  };

  return (
    <StyledLayout
      style={{
        minHeight: "100vh",
      }}
    >
      {props?.student?.is_first_login === false && (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo" />
          <Menu
            theme="dark"
            defaultSelectedKeys={[`${getCurrentActiveLink()}`]}
            mode="inline"
            items={items}
            onClick={(event) => navigate(`${event.item.props.linkurl}`)}
          />
        </Sider>
      )}
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: "0 16px",
          }}
        >
          <StyledHeaderContent>
            <div className="left-section">
              <MenuUnfoldOutlined className="ham-menu" onClick={showDrawer} />
              <StyledDrawer
                title={
                  <div className="title-section">
                    <CloseOutlined
                      style={{ color: "#FFFFFFA6" }}
                      onClick={hideDrawer}
                    />
                  </div>
                }
                placement={"left"}
                closable={false}
                onClose={hideDrawer}
                open={open}
                key={"left"}
              >
                <Menu
                  theme="dark"
                  defaultSelectedKeys={[`${getCurrentActiveLink()}`]}
                  mode="inline"
                  items={items}
                  onClick={(event) =>
                    navigateURL(`${event.item.props.linkurl}`)
                  }
                />
              </StyledDrawer>
            </div>
            <div className="right-section">
              <Dropdown overlay={dropdownMenu}>
                <a onClick={(e) => e.preventDefault()}>
                  <Avatar size={32} icon={<UserOutlined />} />
                </a>
              </Dropdown>
            </div>
          </StyledHeaderContent>
        </Header>
        <Content
          style={{
            margin: "16px 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              height: "100%",
              overflowY: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </StyledLayout>
  );
};

const StyledDrawer = styled(Drawer)`
  @media (max-width: 426px) {
    .ant-drawer-content-wrapper {
      width: 100% !important;
    }
  }
  .ant-drawer-wrapper-body {
  }
  .ant-drawer-header {
    background: #001529;
    border-bottom: 1px solid #f0f0f030;

    .title-section {
      display: flex;
      justify-content: flex-end;
    }
  }
  .ant-drawer-body {
    padding: 0;
    background: #001529;
  }
`;

const StyledHeaderContent = styled.div`
  display: flex;
  justify-content: space-between;

  .left-section {
    display: flex;
    align-items: center;
    .ham-menu {
      display: none;
      cursor: pointer;
      font-size: 20px;

      @media (max-width: 768px) {
        display: flex;
      }
    }
  }

  .right-section {
    .ant-avatar {
      cursor: pointer;
    }
  }
`;

const StyledLayout = styled(Layout)`
  .ant-layout-sider {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

function mapStateToProps(state) {
  return {
    student: state?.student?.student,
    token: state?.auth?.token,
  };
}
export default connect(mapStateToProps, {})(DashboardLayout);
