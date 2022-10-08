import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal, Space, Table, Tooltip, Typography } from "antd";
import { DocumentIcon, DotIcon, EditIcon } from "assets/IconComponent";
import { useEffect, useState } from "react";
import EditMultipleChoice from "./EditMultipleChoice";
import EditSingleChoice from "./EditSingleChoice";
const { Text } = Typography;

const QuestionList = ({ id, questions, setQuestions }) => {
  useEffect(() => {}, [questions]);
  const [questionEdit, setQuestionEdit] = useState();

  const handleOkEdit = () => {
    setIsEditContent(false);
  };
  const handleCancelEdit = () => {
    setIsEditContent(false);
  };
  const [isEditContent, setIsEditContent] = useState(false);
  const showEditModal = (record) => {
    setIsEditContent(true);
    setQuestionEdit(record);
  };
  const renderEditQuestion = () => {
    if (questionEdit) {
      const index = questions.findIndex((item) => {
        return item.title === questionEdit.title;
      });
      if (questionEdit?.type === "Single Choice")
        return (
          <EditSingleChoice
            questions={questions}
            questionEdit={questionEdit}
            setQuestions={setQuestions}
            id={index}
            handleOkEdit={handleOkEdit}
          />
        );
      if (questionEdit?.type === "Multiple Choice")
        return (
          <EditMultipleChoice
            questions={questions}
            questionEdit={questionEdit}
            setQuestions={setQuestions}
            id={index}
            handleOkEdit={handleOkEdit}
          />
        );
    }
  };
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "30%",
      render: (text) => {
        if (text === "Single Choice")
          return (
            <div className="display-flex align-item-center">
              <DotIcon className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
        if (text === "Multiple Choice")
          return (
            <div className="display-flex align-item-center">
              <CheckCircleOutlined className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
        if (text === "Single Line")
          return (
            <div className="display-flex align-item-center">
              <EditIcon className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
        if (text === "Multiple Line")
          return (
            <div className="display-flex align-item-center">
              <DocumentIcon className="content-list-icon mg-right" />
              <Text className="text-bold">{text}</Text>
            </div>
          );
      },
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
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
              <Tooltip placement="top" title={"View Question"}>
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
  if (questions.length > 0)
    return (
      <>
        <Modal
          title={`View ${questionEdit?.type} Question`}
          visible={isEditContent}
          onOk={handleOkEdit}
          className="modal-in-section"
          width={600}
          destroyOnClose
          onCancel={handleCancelEdit}
          footer={[]}
        >
          {renderEditQuestion()}
        </Modal>
        <Table
          columns={columns}
          dataSource={questions}
          showHeader={false}
          pagination={false}
        />
      </>
    );
  return (
    <Typography.Paragraph className="text-center text-gray">
      Empty
    </Typography.Paragraph>
  );
};

export default QuestionList;
