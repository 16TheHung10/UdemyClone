import { Button, Input, Menu, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LeftContentStyled } from "./LeftContentStyled";
const { Search } = Input;
const MenuData = [
  {
    label: "Labels",
    key: "sub1",
    childrend: [
      {
        label: "All",
        key: "1",
      },
      {
        label: "Students",
        key: "2",
      },
      {
        label: "Instructor",
        key: "3",
      },
      {
        label: "Ideads & Opiniions",
        key: "4",
      },
      {
        label: "Edututs & News",
        key: "5",
      },
      {
        label: "Socical innovation",
        key: "6",
      },
    ],
  },
  {
    label: "Archive",
    key: "sub2",
    childrend: [
      {
        label: "January 2022",
        key: "7",
      },
      {
        label: "February 2022",
        key: "8",
      },
      {
        label: "March 2022",
        key: "9",
      },
      {
        label: "April 2022",
        key: "10",
      },
    ],
  },
];
export default function LeftContent() {
  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const getItem = (label, key, children) => {
    return {
      key,
      children,
      label,
    };
  };

  const Item2 = MenuData.map((item) => {
    const children = item.childrend?.map((child) => {
      return getItem(child.label, child.key);
    });
    return getItem(item.label, item.key, children);
  });

  return (
    <LeftContentStyled>
      <Search
        onSearch={() => {
          setIsSearchComplete(true);
          setTimeout(() => {
            setIsSearchComplete(false);
          }, 1000);
        }}
        placeholder="Search"
        enterButton="ICON"
        size="large"
        loading={isSearchComplete}
        className="hr"
      />
      <Menu
        // defaultOpenKeys={["sub1"]}
        mode="inline"
        items={Item2}
        className="hr"
      />
      <div className="btn-group hr">
        <Button className="follow-btn twister">Follow</Button>
        <Button className="follow-btn facebook">Follow</Button>
      </div>
      <div className="footer">
        <Typography.Text className="footer-text">Learn more</Typography.Text>
        <Link to="/" className="footer-link">
          Cursus Help Center
        </Link>
      </div>
    </LeftContentStyled>
  );
}
