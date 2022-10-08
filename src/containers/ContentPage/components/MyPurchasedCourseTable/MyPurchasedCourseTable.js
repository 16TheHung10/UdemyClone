import { DeleteOutlined, EditOutlined, BookOutlined } from "@ant-design/icons";
import { Modal, Table, Tooltip, Tag, Image, Button } from "antd";
import { deleteCourse } from "apis/features/Courses/Courses";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  selectPurchasedCourses,
  selectIsLoading,
} from "redux/features/courses/coursesSelector";
import { getMyPurchasedCourses } from "redux/features/courses/coursesThunk";
import Wrapper from "./MyPurchasedCourseTableStyle";

function MyPurchasedCourseTable() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idDelete, setIdDelete] = useState("");
  const isLoading = useSelector(selectIsLoading);
  const navigate = useNavigate();
  const myPurchasedCourses = useSelector(selectPurchasedCourses);
  // Handle date time
  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;
    return myStringDate.slice(0, myStringDate.search("GMT"));
  };
  // handle model
  const handleOk = async () => {
    await deleteCourse(idDelete);
    await dispatch(getMyPurchasedCourses());
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
    dispatch(getMyPurchasedCourses());
  }, [myPurchasedCourses.length]);

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
          <span>Vendor</span>
        </div>
      ),
      dataIndex: "vendor",
      key: "vendor",
      width: "10%",
      render: (text, record) => (
        <div className="text-center">
          <Link to={`/profile/${record.vendorId}`}>
            <span className="long-content">{text}</span>
          </Link>
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
          <span className="long-content">{text}</span>
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
  ];

  const data = myPurchasedCourses?.map((courseItem, index) => {
    return {
      key: courseItem?.id,
      itemNo: index + 1,
      title: courseItem?.title,
      thumbnailCourse: courseItem.imageUrl,
      publishDate: courseItem?.createdAt,
      sales: courseItem?.price,
      vendor: courseItem?.user?.fullName,
      vendorId: courseItem?.user?.id,
      category: courseItem?.categories.map((item) => item?.name).join(", "),
    };
  });

  return (
    <Wrapper>
      {/* Area 1 */}
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
    </Wrapper>
  );
}

export default MyPurchasedCourseTable;
