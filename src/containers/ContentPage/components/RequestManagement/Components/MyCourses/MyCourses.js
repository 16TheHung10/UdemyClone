import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Table } from "antd";
import { deleteCourse } from "apis/features/Courses/Courses";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "redux/features/auth/AuthSelector";
import { selectCoursesById } from "redux/features/courses/coursesSelector";
import { getCourseById } from "redux/features/courses/coursesThunk";
import Wrapper from "./MyCoursesStyle";

function MyCourses() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const navigate = useNavigate();
  const courseDataById = useSelector(selectCoursesById);
  const userProfile = useSelector(selectUser);
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

  useEffect(() => {
    // Lấy ra course của mình
    dispatch(getCourseById(userProfile?.id));
  }, [isModalVisible]);

  const columns = [
    {
      title: (
        <div className="headerTable">
          <span>Item No</span>
        </div>
      ),
      dataIndex: "itemNo",
      key: "itemNo",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <div className="headerTable">
          <span>Title</span>
        </div>
      ),
      dataIndex: "title",
      key: "title",
    },
    {
      title: (
        <div className="headerTable">
          <span>Publish Date</span>
        </div>
      ),
      dataIndex: "publishDate",
      key: "publishDate",
    },
    {
      title: (
        <div className="headerTable">
          <span>Sales</span>
        </div>
      ),
      dataIndex: "sales",
      key: "sales",
    },
    {
      title: (
        <div className="headerTable">
          <span>Parts</span>
        </div>
      ),
      dataIndex: "parts",
      key: "parts",
    },
    {
      title: (
        <div className="headerTable">
          <span>Category</span>
        </div>
      ),
      dataIndex: "category",
      key: "category",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <div className="headerTable">
          <span>Status</span>
        </div>
      ),
      dataIndex: "status",
      key: "status",
      render: (text) => <span className="statusContent active">{text}</span>,
    },
    {
      title: (
        <div className="headerTable">
          <span>Action</span>
        </div>
      ),
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="actionContent">
          {/* <a>Invite {record.key}</a> */}
          <EditOutlined
            onClick={(e) => navigate(`/edit-course/${record.itemNo}`)}
            className="iconAction"
          />
          <DeleteOutlined
            onClick={(e) => handleDelete(record.key)}
            className="iconAction"
          />
        </div>
      ),
    },
  ];

  const data = courseDataById?.map((courseItem, index) => {
    return {
      key: courseItem?.id,
      itemNo: courseItem?.id,
      title: courseItem?.title,
      publishDate: courseItem?.createdAt,
      sales: courseItem?.price,
      parts: courseItem?.sections.length,
      category: courseItem?.categories.map((item) => item?.name).join(", "),
      status: courseItem?.isActive ? "Active" : "Inactive",
    };
  });

  return (
    <Wrapper>
      <Table columns={columns} dataSource={data} />
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

export default MyCourses;
