import { CheckOutlined, CloseOutlined, FlagOutlined } from "@ant-design/icons";
import { Button, Image, message, Modal, Table, Tag, Tooltip } from "antd";
import {
  getAdminReport,
  updateAdminReport,
} from "apis/features/Report/ReportApi";
import UserImage from "assets/images/user.png";
import React, { useEffect, useState } from "react";
// redux of sidebar
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
// ANT design
import { sideBarAction } from "redux/features/sidebar/sidebarSlice";
// style component
import Wrapper from "./ReportManagementStyle";
import { postNotification } from "apis/features/Notification/Notification";

function ReportManagement(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const userProfile = useSelector(selectUser);
  const [userReceivedNotification,setUserReceivedNotification]=useState()
  const getDataReport = async () => {
    setIsLoading(true);
    const response = await getAdminReport();
    setReports(response?.data?.data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (userProfile?.role !== "Admin") {
      navigate("/");
    }
    dispatch(sideBarAction.changeToDashboard());
    getDataReport();
  }, []);
  console.log(reports);

  // table
  const columns = [
    {
      title: (
        <div className="text-center">
          <span>No</span>
        </div>
      ),
      dataIndex: "itemNo",
      key: "itemNo",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <div className="text-center">
          <span>Type</span>
        </div>
      ),
      dataIndex: "type",
      key: "type",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === 0 && <span>Course</span>}
          {text === 1 && <span>User</span>}
        </div>
      ),
      // render: (text) => <a>{text}</a>,
    },
    {
      dataIndex: "thumbnail",
      key: "thumbnail",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <Image width={64} height={64} src={text} />
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Reported object</span>
        </div>
      ),
      dataIndex: "reportObject",
      key: "reportObject",
      width: "10%",
      render: (text, record) => (
        <Link to={record?.url}>
          <div className="text-center">
            <p className="long-content ">{text}</p>
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Report content</span>
        </div>
      ),
      dataIndex: "reportContent",
      key: "reportContent",
      width: "15%",
      render: (text) => (
        <div className="text-center">
          <p className="long-content ">{text}</p>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Reported by</span>
        </div>
      ),
      dataIndex: "reportedBy",
      key: "reportedBy",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Reported status</span>
        </div>
      ),
      dataIndex: "reportedStatus",
      key: "reportedStatus",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === 0 && <Tag color="#108ee9">Pending</Tag>}
          {text === 1 && <Tag color="#87d068">Approved</Tag>}
          {text === 2 && <Tag color="#f50">Reject</Tag>}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Action</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <div className="actionContent text-center">
          {/* <a>Invite {record.key}</a> */}
          {record.reportedStatus === 0 && (
            <div>
              <Tooltip title="Approve report">
                <CheckOutlined
                  onClick={(e) => {
                    setIsModalVisible(true);
                    setTypeModal("block");
                    setDataReport({
                      id: record.reportId,
                      status: 1,
                    });
                    setUserReceivedNotification(record.reportedById)
                  }}
                  className="iconAction"
                />
              </Tooltip>

              <Tooltip title="Reject report">
                <CloseOutlined
                  onClick={(e) => {
                    setIsModalVisible(true);
                    setTypeModal("reject");
                    setDataReport({
                      id: record.reportId,
                      status: 2,
                    });
                    setUserReceivedNotification(record.reportedById)
                  }}
                  className="iconAction"
                />
              </Tooltip>
            </div>
          )}
          {record.reportedStatus !== 0 && <span>Processed</span>}
        </div>
      ),
    },
  ];

  const data = reports?.map((item, index) => {
    return {
      key: index,
      courseId: item?.course?.id,
      type: item?.type,
      reportId: item?.id,
      reportedUserId: item?.reportedUser?.id,
      recordType: item?.type,
      itemNo: index + 1,
      url:
        item?.type === 0
          ? `/courses/${item?.course?.id}`
          : `/profile/${item?.reportedUser?.id}`,
      thumbnail:
        item?.course?.imageUrl || item?.reportedUser?.image || UserImage,
      reportObject: item?.course?.title || item?.reportedUser?.fullName,
      reportedStatus: item?.status,
      reportContent: item?.description,
      reportedBy: item?.user?.fullName,
      reportedById: item?.user?.id,
    };
  });

  // handle modal reject report
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const [dataReport, setDataReport] = useState({
    id: "",
    status: "",
  });

  const handleOk = async () => {
    switch (typeModal) {
      case "reject":
        await updateAdminReport(dataReport)
          .then((res) => {
            if (res?.data?.isSuccess) {
              message.success("Reject successfully");
              // Gưi noti cho user
              postNotification({
                userIds: [userReceivedNotification],
                type: 0,
                content: `you report have been rejected`,
              });
              // End noti
              getDataReport();
              setIsModalVisible(false);
            }
          })
          .catch((err) => {
            console.log(err);
            message.error("Reject fail");
            setIsModalVisible(false);
          });

        break;
      case "approve":
        await updateAdminReport(dataReport)
          .then((res) => {
            if (res?.data?.isSuccess) {
              message.success("Reject successfully");
              // Gưi noti cho user
              postNotification({
                userIds: [userReceivedNotification],
                type: 0,
                content: `you report have been approved`,
              });
              // End noti
              getDataReport();
              setIsModalVisible(false);
            }
          })
          .catch((err) => {
            console.log(err);
            message.error("Reject fail");
            setIsModalVisible(false);
          });
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // ---End handle delete---

  return (
    <Wrapper>
      {/*Area 1  */}
      <div className="title-area">
        <h2>
          <FlagOutlined style={{ marginRight: 8 }} />
          Report management
        </h2>
      </div>
      {/* Area 2 */}
      <div className="table-area">
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          scroll={{
            x: 1000,
          }}
        />
      </div>

      {/* Modal */}
      <Modal
        title="Confirm action"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button className="btn-secondary btn-outlined" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button className="btn-red" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        {typeModal === "approve" && <p>Are you sure to approve this report?</p>}
        {typeModal === "reject" && <p>Are you sure to reject this report?</p>}
      </Modal>
    </Wrapper>
  );
}

export default ReportManagement;
