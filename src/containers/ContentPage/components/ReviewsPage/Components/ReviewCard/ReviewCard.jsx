import { FlagOutlined } from "@ant-design/icons";
import { Rate, Space, Typography } from "antd";
import Avatar from "components/Avatar/Avatar";
import { ButtonStyled } from "components/Button/ButtonStyled";
import ModalReport from "components/Modal/ModalReport/ModalReport";
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import Wrapper from "./ReviewCardStyle";
export default function ReviewsPage({
  courseTitle,
  linkAvatar,
  userName,
  userId,
  createdAt,
  startPoint,
  comment,
  onReportClick,
  disabledReport,
  onUpdate,
  isShowReportButton,
}) {
  // ----Report Area----
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const userProfile = useSelector(selectUser);
  const handleReport = () => {
    if (userProfile) {
      setIsModalVisible(true);
    } else {
      navigate("/sign-in");
    }
  };
  // ----End Report Area----
  console.log(createdAt);

  return (
    <Wrapper>
      <div className="personInfo">
        {courseTitle && (
          <Typography.Title className="personInfo_course-title" level={5}>
            {courseTitle}
          </Typography.Title>
        )}
        <div className="personInfo-header_wrapper">
          <Space className="user-info">
            <Avatar
              style={{
                width: "50px",
                height: "50px",
                marginRight: "1rem",
              }}
              imgLink={linkAvatar}
              fullName={userName}
            />
            <Space className="userInfo" direction="vertical" size={0}>
              <Typography.Title className="personInfo_name" level={5}>
                {userName}
              </Typography.Title>
              <Typography.Text className="personInfo_time-review">
                {moment(createdAt).fromNow()}
              </Typography.Text>
            </Space>
          </Space>
          {!disabledReport ? (
            isShowReportButton && (
              <Space
                size={4}
                className="personInfo_report"
                onClick={(e) => handleReport()}
              >
                <FlagOutlined />
                <Typography.Text>Report</Typography.Text>
              </Space>
            )
          ) : (
            <ButtonStyled onClick={onUpdate} htmlType="submit">
              Update
            </ButtonStyled>
          )}
        </div>
      </div>
      <Rate
        disabled
        allowHalf
        style={{ color: "#f2b01e", marginTop: 12 }}
        value={startPoint}
      />

      <Typography.Paragraph className="personInfo_comment">
        {comment}
      </Typography.Paragraph>
      <ModalReport
        typeReport={1}
        reportedUserId={userId}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </Wrapper>
  );
}
