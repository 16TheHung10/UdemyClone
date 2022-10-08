import { Spin } from "antd";
import ResponsePage from "components/ResponsePage/ResponsePage";
import ContentPage from "containers/ContentPage/ContentPage";
import { useDarkMode } from "hooks/useDarkMode";
import { FooterRoutes } from "layout/Footer/Footer";
import { NavBarRoutes } from "layout/NavBar/NavBar";
import { NavBarMiniRoutes } from "layout/NavBar/NavbarMini/NavbarMini";
import { SideBarRoutes } from "layout/SideBar/Sidebar";
import React, { useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import * as authSelector from "redux/features/auth/AuthSelector";
import * as cartSelector from "redux/features/cart/CartSelector";
import * as cartAction from "redux/features/cart/CartSlice";
import * as cartThunk from "redux/features/cart/CartThunk";
import * as wishlistThunk from 'redux/features/wishlist/WishlistThunk';
import { selectLoading } from "redux/features/loading/LoadingSelectors";
import { routesVisibleNavbar, routesVisibleNavbarMini } from "routes";
import { ThemeProvider } from "styled-components";
import "Theme/App.css";
import { GlobalStyles, MainLayoutWrapper } from "Theme/GlobalStyles";
import { darkTheme, lightTheme } from "Theme/Theme";
const App = () => {
  const authUser = useSelector(authSelector.selectUser);
  const [theme, themeToggler] = useDarkMode();
  const isLoading = useSelector(selectLoading);
  const location = useLocation();
  const cartData = useSelector(cartSelector.selectCartItems);
  const cartDataUpdate = useSelector(cartSelector.getCart);
  const [isHovering, setIsHovering] = useState(false);
  const scrollRef = useRef();
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  const themeMode = theme === "light" ? lightTheme : darkTheme;
  const dispatch = useDispatch();
  const checkAuthPath =
    routesVisibleNavbar.includes(location.pathname) ||
    routesVisibleNavbarMini.includes(location.pathname);

  React.useEffect(() => {
    if (!!authUser)
      dispatch(cartThunk.getCartItems());
  }, [authUser, dispatch]);

  React.useEffect(() => {
    if (!!authUser)
      dispatch(wishlistThunk.getAllWishlist());
  }, [authUser, dispatch]);

  React.useEffect(() => {
    (async () => {
      if (!!authUser) {
        let previousCartItems = cartData;
        try {
          await dispatch(cartThunk.updateCartItems(cartDataUpdate)).unwrap();
          localStorage.setItem("cart", JSON.stringify([]));
        } catch (err) {
          dispatch(
            cartAction.CartAction.setPreviousCartItems(previousCartItems)
          );
          throw new Error('Update cart failed!');
        }
      }
    })();
  }, [authUser, dispatch, cartDataUpdate, cartData]);

  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const closeCollapsed = () => {
    setCollapsed(false);
  };
  const openCollapsed = () => {
    setCollapsed(true);
  };
  React.useEffect(() => {
    if (window.innerWidth <= 992 && collapsed === true) {
      setCollapsed(false);
    }
  }, []);
  // Handle click toggle side bar when width < 992
  const handleClickToggleSideBar = () => {
    if (window.innerWidth <= 992 && collapsed === true) {
      setCollapsed(false);
    }
  };
  React.useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [location.pathname]);
  function ErrorFallback({ error, resetErrorBoundary }) {
    return (
      <div>
        <ResponsePage
          title="500"
          subTitle="Internal Server Error"
          description={`The server has been deserted for a while. Please be patient or try again later.`}
          children={
            <a
              href="/"
              style={{
                color: isHovering ? "red" : "white",
                backgroundColor: isHovering ? "white" : "red",
                padding: "1rem 2rem",
                borderRadius: "0.5rem",
                border: "1px solid red",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Try Again
            </a>
          }
          textButton="Go to Homepage"
        />
      </div>
    );
  }
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider theme={themeMode}>
        <GlobalStyles />
        <Spin
          spinning={isLoading}
          delay={500}
          tip="Loading..."
          className="spin-loading"
        >
          <MainLayoutWrapper
            checkAuthPath={checkAuthPath}
            pathName={location.pathname}
            className="main-app beauty-scroll-bar"
          >
            <NavBarRoutes
              toggleCollapsed={toggleCollapsed}
              collapsed={collapsed}
              openCollapsed={openCollapsed}
            />
            <NavBarMiniRoutes />
            <div className="middle-content">
              <SideBarRoutes
                collapsed={collapsed}
                closeCollapsed={closeCollapsed}
              />
              <div
                id="scrollableDiv"
                ref={scrollRef}
                className="main-content"
                onClick={(e) => handleClickToggleSideBar()}
              >
                <div className="content-page">
                  <ContentPage />
                </div>
                <div className="footer-page">
                  <FooterRoutes />
                </div>
              </div>
            </div>
          </MainLayoutWrapper>
        </Spin>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
