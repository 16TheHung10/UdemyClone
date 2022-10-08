import { Avatar, Dropdown, Typography } from "antd";
import useAuth from "hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { AuthAction } from "redux/features/auth/AuthSlices";
import StringUtils from "utils/StringUtils";
import LoginDropdownWrapper from "./LoginDropdownStyled";

const LoginDropdown = (props) => {
  const userProfile = useSelector(selectUser);
  const { logout } = useAuth();

  const dispatch = useDispatch();
  const items = [
    {
      label: "Cursus Dashboard",
      key: "item-1",
      path:
        userProfile?.role === "Student"
          ? "/student-dashboard"
          : userProfile?.role === "Instructor"
          ? "/instructors-dashboard"
          : "/admin-dashboard",
    },
    // { label: "Paid Membership", key: "item-2", path: "/paid-membership" },
    { label: "Setting", key: "item-3", path: "/setting" },
    { label: "Help", key: "item-4", path: "/help" },
    // { label: "Send Feedback", key: "item-5", path: "/feedback" },
    { label: "Sign Out", key: "item-6", path: "/sign-in" },
  ];

  return (
    <LoginDropdownWrapper>
      <div className="dropdown-header">
        <div className="d-flex ">
          {userProfile?.image !== null ? (
            <Avatar
              className="login-avatar"
              size={45}
              src={userProfile?.image}
            />
          ) : (
            <Avatar
              className="login-avatar"
              size={45}
              style={{ backgroundColor: "#ed2a26" }}
            >
              {`${userProfile?.firstName} ${userProfile?.lastName}`}
            </Avatar>
          )}
          <div className="">
            <Typography.Text className="name-user">
              {userProfile?.firstName === null
                ? userProfile?.fullName
                : `${userProfile?.firstName} ${userProfile?.lastName}`}
            </Typography.Text>
            <Typography.Text className="email-user">
              {userProfile?.email}
            </Typography.Text>
          </div>
        </div>
        <Link to={`/profile/${userProfile?.id}`}>{`View Profile`}</Link>
      </div>
      <ul className="ant-menu ant-menu-root ant-menu-vertical ant-menu-light">
        {items?.map((item) => {
          if (item.label === "Sign Out") {
            return (
              <li
                onClick={() => logout()}
                key={item.key}
                className="ant-menu-item ant-menu-item-selected ant-menu-item-only-child"
              >
                <span className="ant-menu-title-content">{item.label}</span>
              </li>
            );
          } else if (item.label === "Cursus Dashboard") {
            return (
              <li
                key={item.key}
                onClick={() => {
                  if (window.innerWidth <= 992) {
                    props.openCollapsed();
                  }
                }}
                className="ant-menu-item ant-menu-item-selected ant-menu-item-only-child"
              >
                <Link to={item.path} className="ant-menu-title-content">
                  {item.label}
                </Link>
              </li>
            );
          } else {
            return (
              <li
                key={item.key}
                className="ant-menu-item ant-menu-item-selected ant-menu-item-only-child"
              >
                <Link to={item.path} className="ant-menu-title-content">
                  {item.label}
                </Link>
              </li>
            );
          }
        })}
      </ul>
      {/* <Menu items={items} /> */}
    </LoginDropdownWrapper>
  );
};

const NavBarLoginAvatar = (props) => {
  const userProfile = useSelector(selectUser);
  return (
    <div className="dropdown-container">
      <Dropdown
        overlay={<LoginDropdown openCollapsed={props.openCollapsed} />}
        trigger={["click"]}
        placement="bottomLeft"
        arrow={{ pointAtCenter: true }}
      >
        {userProfile?.image !== null ? (
          <Avatar className="login-avatar" size={45} src={userProfile?.image} />
        ) : (
          <Avatar
            className="login-avatar"
            size={45}
            style={{ backgroundColor: "#ed2a26" }}
          >
            {StringUtils.generateAvatar(
              `${userProfile?.firstName} ${userProfile?.lastName}`
            )}
          </Avatar>
        )}
      </Dropdown>
    </div>
  );
};
export default NavBarLoginAvatar;
//'https://joeschmoe.io/api/v1/random'
