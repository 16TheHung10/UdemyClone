import { Image, Table, Tag } from "antd";
import {
  getAllProcessedCourses
} from "apis/features/Courses/Courses";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// style component
import Wrapper from "./ApprovedCoursesStyled";

function ApprovedCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const [processedCourses, setProcessedCourses] = useState([]);
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;

    return myStringDate.slice(0, myStringDate.search("GMT"));
  };
  const getDataProcessedCourses = async () => {
    setIsLoading(true);
    const response = await getAllProcessedCourses(1);
    setProcessedCourses(response?.data?.data?.result);
    setIsLoading(false);
  };

  useEffect(() => {
    getDataProcessedCourses();
  }, []);

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
          <span>Course title</span>
        </div>
      ),
      dataIndex: "courseTitle",
      key: "courseTitle",
      width: "10%",
      render: (text, record) => (
        <Link to={`/courses/${record.key}`}>
          <div className="text-center">
            <p className="long-content ">{text}</p>
          </div>
        </Link>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Category</span>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Author</span>
        </div>
      ),
      dataIndex: "author",
      key: "author",
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
          <span>Course status</span>
        </div>
      ),
      dataIndex: "courseStatus",
      key: "courseStatus",
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
          <span>Created Date</span>
        </div>
      ),
      dataIndex: "createdDate",
      key: "createdDate",
      width: "8%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{convertDateTime(text)}</span>
        </div>
      ),
    }
  ];

  const data = [...processedCourses].reverse()?.map((item, index) => {
    return {
      key: item?.id,
      itemNo: index + 1,
      thumbnail: item?.imageUrl,
      courseTitle: item?.title,
      author: item?.user?.fullName,
      courseStatus: item?.status,
      createdDate: item?.createdAt,
      category: item?.categories.map((item) => item?.name).join(", "),
    };
  });


  return (
    <Wrapper>
      {/* Area 2 */}
        <Table
          columns={columns}
          dataSource={data}
          loading={isLoading}
          scroll={{
            x: 1000,
          }}
        />
    </Wrapper>
  );
}

export default ApprovedCourses;
