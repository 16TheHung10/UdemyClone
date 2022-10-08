import Wrapper from "./NotificationPageStyled";
import React, { useEffect } from "react";
import { Input, Space, Tabs, Row, Col, message, Spin } from "antd";
import Comment from "components/Comment/Comment";
import { BellOutlined } from "@ant-design/icons";
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
import { getMyNotificationThunk } from "redux/features/notification/notificationThunk";
import {
  selectNotificationList,
  selectIsLoading,
  selectNewNotificationList
} from "redux/features/notification/notificationSelector";
import { deleteMyNotification } from "apis/features/Notification/Notification";
import {notificationAction} from "redux/features/notification/notificationSlice"
import { useDispatch, useSelector } from "react-redux";

export default function NotificationPage() {
  const dispatch = useDispatch();
  const notificationList = useSelector(selectNotificationList);
  const newNotificationList=useSelector(selectNewNotificationList)
  const isLoading = useSelector(selectIsLoading);

  const handleDeleteNotification = async (id) => {
    const response = await deleteMyNotification(id);
    if (response?.data?.isSuccess) {
      message.success("Delete successfully");

    } else {
      message.error("Delete fail");
    }
    dispatch(notificationAction.removeNewNotification(id))
    dispatch(getMyNotificationThunk());
  };

  const handleMarkAsRead = (id) => {
    dispatch(notificationAction.removeNewNotification(id))
  }

  useEffect(() => {
    dispatch(sideBarAction.changeToDashboard());
    dispatch(getMyNotificationThunk());
  }, []);

  return (
    <Wrapper>
      <div className="title-noti">
        <h2>
          {" "}
          <BellOutlined style={{ fontSize: 20 }} /> Notifications
        </h2>
      </div>
      <div className="noti-area">
        <Spin spinning={isLoading}>
          {notificationList?.length === 0 && <p>No notification available</p>}
          {notificationList?.map((notificationItem, index) => (
            <Comment
              key={notificationItem.id}
              id={notificationItem.id}
              linkAvata={notificationItem?.sender?.image}
              name={notificationItem?.sender?.fullName}
              content={notificationItem?.content}
              time={notificationItem?.createdAt}
              handleDeleteNotification={handleDeleteNotification}
              handleMarkAsRead={handleMarkAsRead}
              isNew={newNotificationList.indexOf(notificationItem.id) >= 0}
            />
          ))}
        </Spin>
      </div>
    </Wrapper>
  );
}
