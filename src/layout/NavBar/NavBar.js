import { AppstoreOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Image, Input, Space } from "antd";
import { getAllAudioLanguage } from "apis/features/AudioLanguage/AudioLanguageAPI";
import { getAllCategory } from "apis/features/Category/CategoryAPI";
import { getAllCloseCaption } from "apis/features/CloseCaption/CloseCaptionAPI";
//Assets
import logo from "assets/svg/logo1.svg";
import { useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { audioLanguageAction } from "redux/features/audioLanguage/AudioLanguageSlice";
import { selectUser } from "redux/features/auth/AuthSelector";
import { selectTotalCartItems } from "redux/features/cart/CartSelector";
import { selectCategories } from "redux/features/category/CategorySelector";
import { CategoryAction } from "redux/features/category/CategorySlice";
import { closeCaptionAction } from "redux/features/closeCaption/CloseCaption";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { routesVisibleNavbar } from "routes";
import AuthUtils from "utils/AuthUtils";
import CartDropdown from "./CartDropdown/CartDropDown";
import NotificationList from "./Notification/NotificationList";
import {
  selectNotificationList,
  selectNewNotificationList,
} from "redux/features/notification/notificationSelector";
import { getMyNotificationThunk } from "redux/features/notification/notificationThunk";
import moment from "moment";
//Component
import NavBarLoginAvatar from "./LoginDropdown/NavBarLoginAvatar";
//Styled
import NavbarWrapper from "./NavBarStyled";

export const NavBarRoutes = (props) => {
  return (
    <Routes>
      {routesVisibleNavbar.map((item, index) => (
        <Route
          key={`navbarRouteItem${index}`}
          path={item}
          element={<Navbar {...props} />}
        />
      ))}
      <Route path="*" element={null} />
    </Routes>
  );
};

const CategoryMenu = (categories) => {
  return (
    <ul className="ant-menu ant-menu-root ant-menu-vertical ant-menu-light categories-dropdown dropdown-scroll">
      {categories?.map((item) => (
        <li key={item.id} className="ant-menu-item ant-menu-item-only-child">
          <Link
            to={`/result?category=${encodeURIComponent(item?.name)}`}
            className="ant-menu-title-content"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Navbar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalCartItems = useSelector(selectTotalCartItems);
  const categories = useSelector(selectCategories);
  const notificationList = useSelector(selectNotificationList).map((item) => {
    return {
      id: item?.id,
      name: item?.sender?.fullName,
      content: item?.content,
      time: moment(item?.createdAt).fromNow(),
      imgUrl: item?.sender?.image,
    };
  });
  const newNotificationList = useSelector(selectNewNotificationList);
  const location = useLocation();
  const handleError = useErrorHandler();
  const userProfile = useSelector(selectUser);
  // Notification Area
  useEffect(() => {
    if (userProfile) {
      // dispatch notification
      dispatch(getMyNotificationThunk());
    }
  }, [notificationList.length]);

  // ---End Notification Area---
  useEffect(() => {
    (async () => {
      try {
        const response = await getAllCategory();

        const { isSuccess, message, data } = response?.data;

        if (!isSuccess) {
          alert(message);
        } else {
          dispatch(CategoryAction.updateCategories(data));
        }
      } catch (error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
          return;
        }
        handleError(error);
      }
    })();
    getAllAudioLanguage()
      .then((res) => {
        dispatch(audioLanguageAction.getAudioLanguage(res.data.data));
      })
      .catch((err) => {
        handleError(err);
      });
    getAllCloseCaption()
      .then((res) => {
        dispatch(closeCaptionAction.getCloseCaption(res.data.data));
      })
      .catch((err) => {
        handleError(err);
      });
  }, []);
  return (
    <NavbarWrapper className="navbar-custom-css">
      {/* LEFT NAVBAR */}
      <div className="navbar-left">
        {/* Menu Icon for toggledivlapsed Sidebar */}
        <div className="menu-icon" onClick={props.toggleCollapsed}>
          <button
            className={props.collapsed ? "menu opened" : "menu"}
            aria-label="Main Menu"
            aria-expanded={props.collapsed ? true : false}
          >
            <svg width="40" height="40" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
        </div>

        {/* Brand Logo */}
        <Link
          to="/"
          className="brand-logo_wrapper"
          onClick={(e) => dispatch(sideBarAction.changeToHome())}
        >
          <Image
            style={{ cursor: "pointer" }}
            src={logo}
            preview={false}
            className="brand-logo"
          />
        </Link>
        {/* Categories menu Dropdown */}
        <div className="categories">
          <Dropdown
            overlay={() => CategoryMenu(categories)}
            placement="bottomLeft"
          >
            <Avatar
              className="categories-icon"
              shape="square"
              size={45}
              icon={<AppstoreOutlined />}
            />
          </Dropdown>
        </div>

        {/* Search input */}
        <Input
          className="search-input"
          size="large"
          onKeyDown={(e) =>
            e.keyCode === 13 &&
            navigate(
              `/result?text=${encodeURIComponent(e.target.value.trim())}`
            )
          }
          bordered={false}
          placeholder="Search for Tuts Videos, Tutors, Tests and more ..."
          prefix={<SearchOutlined />}
        />
      </div>

      {/* RIGHT NAVBAR */}
      {AuthUtils.getToken() !== null ? (
        <div className="navbar-right">
          <Space>
            {/* Create New Course Button */}
            {userProfile?.role === "Instructor" &&
            !location.pathname.match("/dashboard/instructor_courses") ? (
              <Button className="btn-red create-course-btn mg-right">
                <Link to="/dashboard/create-course"> Create New Course</Link>
              </Button>
            ) : null}

            {/* Cart count icon */}
            <CartDropdown totalCartItems={totalCartItems} />

            {/* Mail notification */}
            {/* <NotificationList
              type="mail-notifications"
              notifications={fakeEmailNoti}
              viewAllLink={"/view-all-mail"}
            /> */}

            {/* Notification */}

            <NotificationList
              type="notifications"
              notifications={notificationList}
              newNotifications={newNotificationList}
              viewAllLink={"/dashboard/notifications"}
            />

            {/* Login Avatar */}

            <NavBarLoginAvatar openCollapsed={props.openCollapsed} />
          </Space>
        </div>
      ) : (
        <div className="navbar-right">
          <Space>
            {/* Cart count icon */}
            <CartDropdown totalCartItems={totalCartItems} />
            <Button className="btn-red">
              <a href="/sign-in">Login</a>
            </Button>
            <Button className="btn-secondary btn-outlined">
              <a href="/sign-up">Register</a>
            </Button>
          </Space>
        </div>
      )}
    </NavbarWrapper>
  );
};

export default Navbar;
