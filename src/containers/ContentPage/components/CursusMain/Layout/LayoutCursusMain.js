import React, { createContext, useState, useRef } from "react";
import { ContainerLayout, Wraper } from "./LayoutCursusMainStyled";
import { Typography } from "antd";
import Navbar from "./Navbar/Navbar";
const { Title } = Typography;

export const Context = createContext();

const LayoutCursusMain = React.memo(function LayoutCursusMain({
  children,
  title,
}) {
  const selectedValue = useRef("About");
  const changeSelectedValue = (value) => {
    selectedValue.current = value;
  };
  return (
    <Context.Provider value={{ selectedValue, changeSelectedValue }}>
      <Wraper>
        <div className="layout-header">
          <ContainerLayout className="layout-header-navbar">
            <Navbar />
            <Title level={3} className="layout-header-title">
              {title || "Title"}
            </Title>
          </ContainerLayout>
        </div>

        <div className="content">
          <div className="content-main">{children}</div>
        </div>
      </Wraper>
    </Context.Provider>
  );
});
export default LayoutCursusMain;
