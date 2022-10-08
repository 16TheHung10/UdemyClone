import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Menu, Typography } from "antd";
import { changeParentElement, getItem } from "layout/LayoutUtils";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { selectCategories } from "redux/features/category/CategorySelector";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { selectMySubscription } from "redux/features/subscription/subscriptionSelector";
import { subscriptionAction } from "redux/features/subscription/subscriptionSlice";
import { getMySubscriptionThunk } from "redux/features/subscription/subscriptionThunk";
//COMPONENT
import { routesVisibleSidebar } from "routes";
import {
  adminItem,
  generalUserItems,
  instructorUserItem,
  settingItems,
  studentUserItem,
} from "./SideBarItem";
import MenuWrapper from "./SideBarStyled";

export const SideBarRoutes = (props) => {
  return (
    <Routes>
      {routesVisibleSidebar.map((item, index) => (
        <Route
          key={`sidebarRouteItem${index}`}
          path={item}
          element={<SideBar {...props} />}
        />
      ))}
      <Route path="*" element={null} />
    </Routes>
  );
};

function SideBar(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarUi = useSelector((state) => state.sidebarPage.sideBarUI);
  const categories = useSelector(selectCategories);

  const [menuItem, setMenuItem] = useState([]);
  const [isLoadAllSubscription, setIsLoadAllSubscription] = useState(false);
  const mySubscription = useSelector(selectMySubscription);
  const userProfile = useSelector(selectUser);
  // Get my subscribe
  useEffect(() => {
    if (userProfile) {
      dispatch(getMySubscriptionThunk());
    }
    if (
      location.pathname.match("dashboard") ||
      location.pathname.match("admin")
    ) {
      dispatch(sideBarAction.changeToDashboard());
    }
    if (location.pathname === "/") {
      dispatch(sideBarAction.changeToHome());
    }
  }, []);

  // Check URL and role
  useEffect(() => {
    // Subscription item side bar
    const mySubscriptionShow = isLoadAllSubscription
      ? mySubscription
      : mySubscription.filter((item, index) => index <= 2);
    const subscribeItems =
      mySubscription?.length > 0
        ? [
            ...mySubscriptionShow.map((item) => {
              return getItem(
                <div
                  onClick={(e) => {
                    navigate(`/profile/${item?.user?.id}`);
                    dispatch(
                      subscriptionAction.changeURL(window.location.pathname)
                    );
                  }}
                >
                  <span>{item?.user?.fullName}</span>
                </div>,
                null,
                <Badge
                  onClick={(e) => console.log(1)}
                  dot={item?.isOnline}
                  offset={[158, 18]}
                >
                  <Avatar src={item?.user?.image} />
                </Badge>
              );
            }),
            // Phần load more
            mySubscription.length > 3
              ? getItem(
                  <Typography.Text
                    onClick={(e) =>
                      setIsLoadAllSubscription(!isLoadAllSubscription)
                    }
                    strong
                    className="ant-menu-item"
                  >
                    {!isLoadAllSubscription && `See all`}
                    {isLoadAllSubscription && `See less`}
                  </Typography.Text>,
                  null,
                  <>
                    {!isLoadAllSubscription && <DownOutlined />}
                    {isLoadAllSubscription && <UpOutlined />}
                  </>
                )
              : null,
            // Line phân chia
            getItem(
              <div className="subscription-title line-separate"></div>,
              null,
              null,
              null,
              "group"
            ),
          ]
        : [
            getItem(
              <Button type="text" disabled>
                NO SUBSCRIPTIONS
              </Button>
            ),
          ];
    // Concat tiếp với mảng
    if (sidebarUi === "dashboard") {
      const role = userProfile?.role;
      if (role === "Student") {
        setMenuItem(studentUserItem);
      } else if (role === "Instructor") {
        setMenuItem(instructorUserItem);
      } else if (role === "Admin") {
        setMenuItem(adminItem);
      } else {
        navigate("/sign-in");
      }
    } else {
      setMenuItem(
        generalUserItems(categories, userProfile)
          ?.concat(userProfile && subscribeItems)
          ?.concat(settingItems)
      );
    }
  }, [sidebarUi, categories, mySubscription.length, isLoadAllSubscription]);

  //-- End check role--

  // Theme
  const [theme, setTheme] = React.useState("light");
  useEffect(() => {
    changeParentElement("15rem");
  });

  return (
    <MenuWrapper className="side-bar">
      <Menu
        className={
          props.collapsed ? "sidebar-custom" : "sidebar-custom collapsed"
        }
        theme={theme}
        onClick={() => {
          if (window.innerWidth <= 992 && props.collapsed === true)
            props.closeCollapsed();
        }}
        defaultOpenKeys={
          location.pathname === "/admin/manage-users/instructor" ||
          location.pathname === "/admin/manage-users/student"
            ? ["/admin/manage-users"]
            : [location.pathname]
        }
        defaultSelectedKeys={["/admin/manage-users/student"]}
        selectedKeys={[location.pathname]}
        mode="inline"
        items={menuItem}
      />
    </MenuWrapper>
  );
}

export default SideBar;
