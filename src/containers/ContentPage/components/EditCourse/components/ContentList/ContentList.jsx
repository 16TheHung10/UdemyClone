import { Button, Modal, Space, Table, Tooltip, Typography } from "antd";
import {
  AssignmentIcon,
  Bin,
  EditIcon,
  LectureIcon,
  QuestionIcon,
} from "assets/IconComponent";
import update from "immutability-helper";
import { useCallback, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { selectContentsById } from "redux/features/edit-course/EditCourseSelector";
import { editCourseAction } from "redux/features/edit-course/EditCourseSlice";
import EditAssignment from "../Modal/EditAssignment";
import EditLecture from "../Modal/EditLecture";
import EditQuiz from "../Modal/EditQuiz";

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

const ContentList = ({ id }) => {
  const dispatch = useDispatch();
  const contents = useSelector((state) => selectContentsById(state, id));
  const [itemDelete, setItemDelete] = useState();
  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };
  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = contents[dragIndex];
      const data = update([...contents], {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRow],
        ],
      });
      dispatch(editCourseAction.updateContentList({ data, id }));
    },
    [contents, id, dispatch]
  );
  const [isDeleteContent, setIsDeleteContent] = useState(false);

  const showDeleteContent = (data) => {
    setIsDeleteContent(true);
    setItemDelete(data);
  };

  const handleOkContent = () => {
    setIsDeleteContent(false);
  };

  const handleCancelContent = () => {
    setIsDeleteContent(false);
  };
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
          <EditLecture
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
          <EditQuiz
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
          <EditAssignment
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
              <Tooltip placement="top" title={"Edit Item"}>
                <EditIcon
                  onClick={() => showEditModal(record)}
                  className="content-list-icon content-list-icon-action"
                />
              </Tooltip>
              <Tooltip placement="top" title={"Delete Item"}>
                <Bin
                  onClick={() => showDeleteContent(record)}
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
    <DndProvider backend={HTML5Backend}>
      <Modal
        title={`Do you want to delete this ${itemDelete?.type}?`}
        visible={isDeleteContent}
        onOk={handleOkContent}
        onCancel={handleCancelContent}
        footer={[
          <Button
            key="submit"
            className="btn-red"
            onClick={() => {
              dispatch(
                editCourseAction.deleteContentItem({
                  id: id,
                  title: itemDelete?.title,
                })
              );
              handleOkContent();
            }}
          >
            Yes
          </Button>,
          <Button
            key="back"
            onClick={handleCancelContent}
            className="btn-cancel"
          >
            No
          </Button>,
        ]}
      >
        <p>Click Yes to delete this {itemDelete?.type} or click No to cancel</p>
      </Modal>
      <Modal
        title={`Edit ${contentEdit?.type}`}
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
};

export default ContentList;
