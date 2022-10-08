import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Table, Tooltip, Typography } from "antd";
import { Bin, DocumentIcon, DotIcon, EditIcon } from "assets/IconComponent";
import update from "immutability-helper";
import { useCallback, useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditMultipleChoice from "./EditMultipleChoice";
import EditMultipleLine from "./EditMultipleLine";
import EditSingleChoice from "./EditSingleChoice";
import EditSingleLine from "./EditSingleLine";
const { Text } = Typography;
const type = "DraggableBodyRow";

const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = useRef(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};

      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName:
          dragIndex < index ? " drop-over-downward" : " drop-over-upward",
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: {
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{
        cursor: "move",
        ...style,
      }}
      {...restProps}
    />
  );
};

const QuestionList = ({ id, questions, setQuestions }) => {
  useEffect(() => {}, [questions]);
  const [questionDelete, setQuestionDelete] = useState();
  const [questionEdit, setQuestionEdit] = useState();
  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = questions[dragIndex];
      const data = update([...questions], {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      setQuestions([...data]);
    },
    [questions, setQuestions]
  );
  const [isDeleteContent, setIsDeleteContent] = useState(false);
  const showDeleteQuestion = (record) => {
    setIsDeleteContent(true);
    setQuestionDelete(record);
  };

  const handleOkQuestions = () => {
    setIsDeleteContent(false);
  };
  const handleCancelQuestion = () => {
    setIsDeleteContent(false);
  };
  const handleDeleteQuestion = (title) => {
    let index = questions.findIndex((item) => {
      return item.title === title;
    });
    if (index !== -1) {
      questions.splice(index, 1);
      setQuestions([...questions]);
    }
  };
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
      if (questionEdit?.type === "Single Line")
        return (
          <EditSingleLine
            questions={questions}
            questionEdit={questionEdit}
            setQuestions={setQuestions}
            id={index}
            handleOkEdit={handleOkEdit}
          />
        );
      if (questionEdit?.type === "Multiple Line")
        return (
          <EditMultipleLine
            questions={questions}
            questionEdit={questionEdit}
            setQuestions={setQuestions}
            id={index}
            handleOkEdit={handleOkEdit}
          />
        );
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
              <Tooltip placement="top" title={"Edit Question"}>
                <EditIcon
                  onClick={() => showEditModal(record)}
                  className="content-list-icon content-list-icon-action"
                />
              </Tooltip>
              <Tooltip placement="top" title={"Delete Question"}>
                <Bin
                  onClick={() => showDeleteQuestion(record)}
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
      <DndProvider backend={HTML5Backend}>
        <Modal
          title={`Do you want to delete this ${questionDelete?.type}?`}
          visible={isDeleteContent}
          onOk={handleOkQuestions}
          onCancel={handleCancelQuestion}
          footer={[
            <Button
              key="submit"
              className="btn-red"
              onClick={() => {
                handleDeleteQuestion(questionDelete?.title);
                handleOkQuestions();
              }}
            >
              Yes
            </Button>,
            <Button
              key="back"
              onClick={handleCancelQuestion}
              className="btn-cancel"
            >
              No
            </Button>,
          ]}
        >
          <p>
            Click Yes to delete this {questionDelete?.type} or click No to
            cancel
          </p>
        </Modal>
        <Modal
          title={`Edit ${questionEdit?.type} Question`}
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
          components={components}
          pagination={false}
          onRow={(_, index) => {
            const attr = {
              index,
              moveRow,
            };
            return attr;
          }}
        />
      </DndProvider>
    );
  return (
    <Typography.Paragraph className="text-center text-gray">
      Empty
    </Typography.Paragraph>
  );
};

export default QuestionList;
