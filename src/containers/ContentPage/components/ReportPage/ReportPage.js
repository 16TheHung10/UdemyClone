import Wrapper from "./ReportPageStyled";
import {
  FlagOutlined,
  ImportOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getMyReport } from "apis/features/Report/ReportApi";
import { Table, Modal, message, Tooltip, Image, Tag } from "antd";
import { Link } from "react-router-dom";
import UserImage from "assets/images/user.png";

export default function ReportPage() {
  const [myReportData, setMyReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getMyReport();
      setMyReportData(response.data.data);
      setIsLoading(false);
    })();
  }, []);
  console.log(myReportData);

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
          <span>Reported status</span>
        </div>
      ),
      dataIndex: "reportedStatus",
      key: "reportedStatus",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === 0 && <Tag color="#108ee9">pending</Tag>}
          {text === 1 && <Tag color="#87d068">Approve</Tag>}
          {text === 2 && <Tag color="#f50">Reject</Tag>}
        </div>
      ),
    },
  ];

  const data = myReportData?.map((item, index) => {
    return {
      key: index,
      courseId: item?.course?.id,
      type: item?.type,
      reportId: item?.id,
      recordType: item?.type,
      url: item?.type === 0 ? `/courses/${item?.course?.id}` : `/profile/${item?.reportedUser?.id}`,
      itemNo: index + 1,
      thumbnail: item?.course?.imageUrl || item?.reportedUser?.image || UserImage,
      reportObject: item?.course?.title || item?.reportedUser?.fullName,
      reportedStatus: item?.status,
      reportContent: item?.description,
      reportedById: item?.user?.id,
    };
  });

  return (
    <Wrapper>
      <h2 className="headerReportPage">
        <FlagOutlined className="flagIcon" />
        Report history
      </h2>

      <h4 className="headerThankYou">Thanks for reporting</h4>
      <p>
        Any member of the Edututs+ community can flag content to us that they
        believe violates our Community Guidelines. When something is flagged,
        it’s not automatically taken down. Flagged content is reviewed in line
        with the following guidelines:
      </p>
      <ul>
        <li>
          <p>
            Content that violates our <a href="#">Community Guidelines</a> is
            removed from Edututs+.
          </p>
        </li>
        <li>
          <p>
            Content that may not be appropriate for all younger audiences may be
            age-restricted.
          </p>
        </li>
      </ul>

      <a>Learn more about reporting content on Edututs+.</a>

      <div className="submittedReportArea">
        {/* Area 2 */}
        <div className="table-area">
          <Table columns={columns} dataSource={data} loading={isLoading} />
        </div>
      </div>
    </Wrapper>
  );
}
