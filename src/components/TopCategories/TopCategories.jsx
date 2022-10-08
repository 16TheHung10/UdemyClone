import { Space, Typography, Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import TopCategoriesWrapper from "./TopCategoriesStyled";

function TopCategories(props) {
  const { data } = props;
  return (
    <TopCategoriesWrapper>
      <div className="top-categories_header">
        <Typography.Title level={5}>Top Categories</Typography.Title>
      </div>
      <Space direction="vertical" size={0}>
        {data.length > 0 ? (
          <>
            {data.map((category, index) => (
              <Link
                key={category.id}
                to={`/result?category=${encodeURIComponent(category.name)}`}
              >
                <div align="baseline" className="top-categories_item">
                  <Typography.Text>
                    <div className="top-categories_icon">{index + 1}.</div>
                    {category.name}
                  </Typography.Text>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <div align="baseline" className="top-categories_item">
              <Skeleton active></Skeleton>
            </div>
          </>
        )}
      </Space>
    </TopCategoriesWrapper>
  );
}

export default TopCategories;
