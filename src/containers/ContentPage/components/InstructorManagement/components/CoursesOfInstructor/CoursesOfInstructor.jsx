import React from "react";
import { Table, Button, Space } from "antd";
import * as instructor from "apis/features/Instructor/Instructor";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

const CoursesOfInstructorWrapper = styled.div`
  &&& {
  }
`;

function CoursesOfInstructor(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = props;
  const [courseOfInstructorData, setCourseOfInstructorData] = React.useState(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);
  console.log(location);
  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await instructor.getInstructorById(id);
        setCourseOfInstructorData(res.data.data.courses);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    })();
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "imageUrl",
      key: "imageUrl",
      align: "center",
      render: (_, record) => (
        <img
          style={{ width: "52px", height: "52px" }}
          alt=""
          src={record.imageUrl}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      align: "center",
    },
    {
      align: "center",
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => (text === 0 ? 0 : `$${text}`),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      align: "center",
      render: (_, record) => (
        <Space>
          <a
            href={`/courses/${record.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="primary">Course Detail Page</Button>
          </a>
        </Space>
      ),
    },
  ];

  return (
    <CoursesOfInstructorWrapper>
      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        dataSource={courseOfInstructorData}
      ></Table>
    </CoursesOfInstructorWrapper>
  );
}

export default CoursesOfInstructor;
