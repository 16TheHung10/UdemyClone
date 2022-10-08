import { BellOutlined, MailOutlined, RightOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Tooltip } from "antd";
import Avatar from "components/Avatar/Avatar";
import { Link } from "react-router-dom";
import NotificationWrapper from "./NotificationStyled";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import {notificationAction} from "redux/features/notification/notificationSlice"

const NotiList = (props) => {
  const { newNotifications } = props;
  const dispatch = useDispatch();
  return (
    <NotificationWrapper>
      {props.fewNoti.map((noti) => {
        return (
          <div
            className={clsx("noti-dropdown")}
            key={props.fewNoti.indexOf(noti)}
            onClick={e=>dispatch(notificationAction.removeNewNotification(noti.id))}
          >
            {/* Kiểm tra có phải new noti */}
            {newNotifications.indexOf(noti.id) >= 0 && (
              <Badge color="geekblue" className="dot-read" offset={[0, 3]}></Badge>
            )}

            <div className="img-column">
              <Avatar
                style={{ width: 50, height: 50 }}
                imgLink={noti.imgUrl}
                fullName={noti.name}
              />
            </div>
            <div className="content-column">
              <p>{noti.name}</p>
              <span>{`${noti.action ? noti.action : ""} `}</span>{" "}
              <Tooltip title={noti.content}>
                <span
                  className={`${
                    noti.action ? "noti-content-bold" : ""
                  } noti-content`}
                >
                  {noti.content}
                </span>
              </Tooltip>
              <span className="noti-time">{noti.time}</span>
            </div>
          </div>
        );
      })}
      <Link to={`${props.viewAllLink}`}>
        <Button type="danger" className="btn-view-all">
          View all <RightOutlined />
        </Button>
      </Link>
    </NotificationWrapper>
  );
};

const NotificationList = (props) => {
  let fewNoti = props.notifications ? [...props.notifications.slice(0, 3)] : [];
  // let viewAllLink = props.viewAllLink ? props.viewAllLink : '#';
  let viewAllLink = "/dashboard/notifications";

  return (
    <Dropdown
      overlay={
        <NotiList
          fewNoti={fewNoti}
          viewAllLink={viewAllLink}
          newNotifications={props.newNotifications}
        />
      }
      trigger={["click"]}
      placement="bottomLeft"
    >
      <Badge count={props.newNotifications ? props.newNotifications.length : 0}>
        {props.type === "mail-notifications" ? (
          <MailOutlined className="notification" />
        ) : (
          <BellOutlined className="notification" />
        )}
      </Badge>
    </Dropdown>
  );
};

export default NotificationList;
