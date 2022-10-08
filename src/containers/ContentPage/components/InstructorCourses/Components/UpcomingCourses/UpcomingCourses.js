import Wrapper from "./UpcomingCoursesStyle";
import { Modal, Table, Tooltip, Tag, Image } from "antd";
import clsx from "clsx";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectMyCreatedCourses } from "redux/features/courses/coursesSelector";
import { useState } from "react";
import { deleteCourse } from "apis/features/Courses/Courses";

function UpcomingCourses() {
  const myCreatedCourses = useSelector(selectMyCreatedCourses);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  console.log(myCreatedCourses);
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;
    return myStringDate.slice(0, myStringDate.search("GMT"));
  };

  // handle model
  const handleOk = () => {
    setIsModalVisible(false);
    deleteCourse(idDelete);
  };

  const handleCancel = () => {
    setIdDelete("");
    setIsModalVisible(false);
  };
  // Handle delete
  const handleDelete = (idCourse) => {
    setIsModalVisible(true);
    setIdDelete(idCourse);
  };

  const columns = [
    {
      title: (
        <div className="headerTable text-center">
          <span>Item No</span>
        </div>
      ),
      dataIndex: "itemNo",
      key: "itemNo",
      width: "7%",
      render: (text) => (
        <div className=" text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "",
      dataIndex: "thumbnailCourse",
      key: "thumbnailCourse",
      width: "5%",
      render: (text) => <Image width={64} src={text} />,
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Title</span>
        </div>
      ),
      dataIndex: "title",
      key: "title",
      width: "15%",
      render: (text, record) => (
        <Tooltip placement="topLeft" title={text}>
          <Link to={`/courses/${record.key}`}>
            <span className="long-content">{text}</span>
          </Link>
        </Tooltip>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Publish Date</span>
        </div>
      ),
      dataIndex: "publishDate",
      key: "publishDate",
      width: "8%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{convertDateTime(text)}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Price</span>
        </div>
      ),
      dataIndex: "sales",
      key: "sales",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{`${text}$`}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Parts</span>
        </div>
      ),
      dataIndex: "parts",
      key: "parts",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Category</span>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      width: "10%",
      render: (text) => (
        <div className="text-center">
          <Tooltip placement="topLeft" title={text}>
            <span className="long-content">{text}</span>
          </Tooltip>
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Status</span>
        </div>
      ),
      dataIndex: "status",
      key: "status",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {<Tag color="#f50">{text}</Tag>}
        </div>
      ),
    }
  ];

  // Not have data
  const data = myCreatedCourses
    ?.filter((item) => item.status === 0)
    ?.map((courseItem, index) => {
      return {
        key: courseItem?.id,
        itemNo: index + 1,
        title: courseItem?.title,
        thumbnailCourse: courseItem.imageUrl,
        publishDate: courseItem?.createdAt,
        sales: courseItem?.price,
        parts: courseItem?.sections.length,
        category: courseItem?.categories.map((item) => item?.name).join(", "),
        status:
          courseItem?.status === 0
            ? "Pending"
            : courseItem?.status === 1
            ? "Approved"
            : "Reject",
      };
    });

  return (
    <Wrapper>
      <Table
        columns={columns}
        dataSource={data}
        scroll={{
          x: 1000,
        }}
      />
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to delete?</p>
      </Modal>
    </Wrapper>
  );
}

export default UpcomingCourses;
