import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Modal, Table, Tag, Tooltip } from "antd";
import { deleteCourse } from "apis/features/Courses/Courses";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import {
  selectIsLoading,
  selectMyCreatedCourses,
} from "redux/features/courses/coursesSelector";
import { getMyCreatedCourses } from "redux/features/courses/coursesThunk";
import Wrapper from "./MyCoursesStyle";

function MyCourses() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const myCreatedCourses = useSelector(selectMyCreatedCourses);
  const userProfile = useSelector(selectUser);
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;

    return myStringDate.slice(0, myStringDate.search("GMT"));
  };
  // handle model
  const handleOk = async () => {
    await deleteCourse(idDelete);
    await dispatch(getMyCreatedCourses(userProfile?.id));
    setIsModalVisible(false);
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

  useEffect(() => {
    // Lấy ra course của mình
    dispatch(getMyCreatedCourses(userProfile?.id));
  }, [myCreatedCourses.length]);

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
          {text === "Active" && <Tag color="#87d068">{text}</Tag>}
          {text === "Inactive" && <Tag color="#f50">{text}</Tag>}
        </div>
      ),
    },
    {
      title: (
        <div className="headerTable text-center">
          <span>Action</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <div className="actionContent text-center">
          {/* <a>Invite {record.key}</a> */}
          <Tooltip placement="topLeft" title={"Edit course"}>
            <EditOutlined
              onClick={(e) => navigate(`/dashboard/edit-course/${record.key}`)}
              className="iconAction"
            />
          </Tooltip>

          <Tooltip placement="topLeft" title={"Delete course"}>
            <DeleteOutlined
              onClick={(e) => handleDelete(record.key)}
              className="iconAction"
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const data = myCreatedCourses?.map((courseItem, index) => {
    return {
      key: courseItem?.id,
      itemNo: index + 1,
      title: courseItem?.title,
      thumbnailCourse: courseItem.imageUrl,
      publishDate: courseItem?.createdAt,
      sales: courseItem?.price,
      parts: courseItem?.sections.length,
      category: courseItem?.categories.map((item) => item?.name).join(", "),
      status: courseItem?.isActive ? "Active" : "Inactive",
    };
  });

  return (
    <Wrapper>
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
      <Modal
        title={<h3>Delete confirm</h3>}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button className="btn-cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            className="btn-red"
            onClick={handleOk}
            type="primary"
            loading={isLoading}
          >
            OK
          </Button>,
        ]}
      >
        <p style={{ fontSize: 16 }}>Are you sure to delete this course?</p>
      </Modal>
    </Wrapper>
  );
}

export default MyCourses;
