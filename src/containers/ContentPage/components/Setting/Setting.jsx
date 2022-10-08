import { SettingOutlined } from "@ant-design/icons";
import { Button, Space, Typography } from "antd";
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import AccountSetting from "./components/AccountSetting/AccountSetting";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import SettingWrapper from "./SettingStyled";

export default function SettingPage() {
  const location = useLocation();
  return (
    <SettingWrapper>
      <Space direction="vertical" size={32}>
        <Space align="baseline">
          <SettingOutlined style={{ fontSize: "18px" }} />
          <Typography.Title level={4} className="setting_title">
            Setting
          </Typography.Title>
        </Space>

        <Space>
          <NavLink
            to="/setting/account"
            className={(navLinkData) => {
              return navLinkData.isActive || location.pathname === "/setting"
                ? "active"
                : "";
            }}
          >
            <Button className="setting_btn" type="text">
              Account
            </Button>
          </NavLink>
          <NavLink
            to="/setting/change-password"
            className={(navLinkData) => (navLinkData.isActive ? "active" : "")}
          >
            <Button className="setting_btn" type="text">
              Change Password
            </Button>
          </NavLink>
          {/* <NavLink
            to="/setting/address"
            className={(navLinkData) => (navLinkData.isActive ? "active" : "")}
          >
            <Button className="setting_btn" type="text">
              Address
            </Button>
          </NavLink> */}
        </Space>
        <Outlet />
      </Space>
    </SettingWrapper>
  );
}
