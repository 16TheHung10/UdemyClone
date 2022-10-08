import {
  DeleteOutlined,
  CheckOutlined,
  DislikeOutlined,
  EditOutlined,
  HeartOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { Space, Typography,Badge } from "antd";
import Avatar from "components/Avatar/Avatar";
import MoreDropdown from "components/MoreDropdown/MoreDropdown";
import React from "react";
import styled from "styled-components";
import moment from "moment";

const CommentWrapper = styled.div`
  &&& {
    background-color: #fff;
    padding: 20px;
    padding-left: ${(props) => (props.type ? "80px" : "20px")};
    border-bottom: 1px solid #efefef;
    .comment_header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }
    .comment_user-name {
      margin: 0;
    }
    .comment_content {
      margin-top: 16px;
    }
    .comment_group-action {
      & > .ant-space-item {
        cursor: pointer;
        &:hover {
          color: red;
          .ant-typography {
            color: red;
          }
        }
      }
    }
  }
`;

function Comment(props) {
  const { type, linkAvata, content, name, time, id, handleDeleteNotification,isNew,handleMarkAsRead } =
    props;

  const moreDropdownSettings = [
    {
      key: 1,
      row: (
        <Space size={16} onClick={(e) => handleMarkAsRead(id)}>
          <CheckOutlined />
          <Typography.Text>Have read</Typography.Text>
        </Space>
      ),
    },
    {
      key: 2,
      row: (
        <Space size={16} onClick={(e) => handleDeleteNotification(id)}>
          <DeleteOutlined />
          <Typography.Text>Delete</Typography.Text>
        </Space>
      ),
    },
  ];

  return (
    <CommentWrapper type={type}>
      {isNew&&<Badge color="geekblue" offset={[0, 0]}></Badge>}
      <div className="comment_header">
        <Space align="start" size={12}>
          <Avatar
            style={{ width: "52px", height: "52px" }}
            imgLink={linkAvata}
            fullName={name}
          />
          <Space direction="vertical" size={0}>
            <Typography.Title className="comment_user-name" level={5}>
              {name}
            </Typography.Title>
            <Typography.Text style={{ color: "var(--text-color)" }}>
              {moment(time).fromNow()}
            </Typography.Text>
          </Space>
        </Space>
        <MoreDropdown menu={moreDropdownSettings} isDisableOnClickItem={true} />
      </div>
      <Typography.Paragraph
        className="comment_content"
        style={{ color: "var(--text-color)" }}
      >
        {content}
      </Typography.Paragraph>
    </CommentWrapper>
  );
}

export default Comment;
