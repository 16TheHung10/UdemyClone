import { EyeOutlined } from "@ant-design/icons";
import { Modal, Space, Table, Tooltip, Typography } from "antd";
import {
  AssignmentIcon,
  LectureIcon,
  QuestionIcon,
} from "assets/IconComponent";
import { useState } from "react";
import ViewAssignment from "../Modal/ViewAssignment";
import ViewLecture from "../Modal/ViewLecture";
import ViewQuiz from "../Modal/ViewQuiz";

const { Text } = Typography;
const ContentList = ({ id, contents }) => {
  const handleOkEdit = () => {
    setIsEditContent(false);
  };
  const handleCancelEdit = () => {
    setIsEditContent(false);
  };
  const [isEditContent, setIsEditContent] = useState(false);
  const [contentEdit, setContentEdit] = useState();
  const showEditModal = (record) => {
    setIsEditContent(true);
    setContentEdit(record);
  };
  const renderEditContent = () => {
    if (contentEdit) {
      const index = contents.findIndex((item) => {
        return item.title === contentEdit?.title;
      });
      if (contentEdit?.type === "Lecture") {
        return (
          <ViewLecture
            idEdit={index}
            id={id}
            handleOkEdit={handleOkEdit}
            contentEdit={contentEdit}
            contents={contents}
          />
        );
      }
      if (contentEdit?.type === "Quiz") {
        return (
          <ViewQuiz
            idEdit={index}
            id={id}
            handleOkEdit={handleOkEdit}
            contentEdit={contentEdit}
            contents={contents}
          />
        );
      }
      if (contentEdit?.type === "Assignment") {
        return (
          <ViewAssignment
            idEdit={index}
            id={id}
            handleOkEdit={handleOkEdit}
            contentEdit={contentEdit}
            contents={contents}
          />
        );
      }
    }
  };
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "20%",
      render: (text) => {
        if (text === "Lecture")
          return (
            <div className="display-flex align-item-center">
              <LectureIcon className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
        if (text === "Quiz")
          return (
            <div className="display-flex align-item-center">
              <QuestionIcon className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
        if (text === "Assignment")
          return (
            <div className="display-flex align-item-center">
              <AssignmentIcon className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "60%",
      render: (text) => {
        return <Text className="text-bold">{text}</Text>;
      },
    },
    {
      title: "Action",
      key: "action",
      width: "20%",
      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <Tooltip placement="top" title={"View Item"}>
                <EyeOutlined
                  onClick={() => showEditModal(record)}
                  className="content-list-icon content-list-icon-action"
                />
              </Tooltip>
            </Space>
          </>
        );
      },
    },
  ];
  return (
    <>
      <Modal
        title={`View ${contentEdit?.type}`}
        visible={isEditContent}
        onOk={handleOkEdit}
        className="modal-in-section"
        width={800}
        destroyOnClose
        onCancel={handleCancelEdit}
        footer={[]}
      >
        {renderEditContent()}
      </Modal>
      <Table
        columns={columns}
        dataSource={contents}
        showHeader={false}
        pagination={false}
      />
    </>
  );
};

export default ContentList;
