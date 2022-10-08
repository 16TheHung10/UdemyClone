import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { Collapse, Space, Typography, Modal } from "antd";
import React from "react";
import CourseContentWrapper from "./CourseContentStyled";
import {
  FileOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import CollapseHeader from "./components/CollapseHeader/CollapseHeader";
import CollapsePanelRow from "./components/CollapsePanelRow/CollapsePanelRow";
import { formatTime } from "utils/TimeUtil";
import { Link } from "react-router-dom";

function CourseContent(props) {
  const { data, courseStatus } = props;
  const [collapseKey, setCollapseKey] = React.useState(["0"]);
  const [toggleCollapse, setToggleCollapse] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const arrayCollapseKey = React.useRef([]);

  const handleRowCourseContentClick = () => {
    if (courseStatus !== "enrolled") {
      setVisible(true);
    }
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const panelCollapseActiveHandler = (key) => {
    setCollapseKey(key);
  };

  const toggleCollapseCourseContent = () => {
    setCollapseKey((prevKey) => {
      if (prevKey.length === 1 && toggleCollapse === false)
        return arrayCollapseKey.current;
      else if (prevKey.length >= 1 && toggleCollapse === true) {
        return [];
      } else if (prevKey.length === 0 && toggleCollapse === true) {
        return [];
      } else return arrayCollapseKey.current;
    });
    setToggleCollapse((prev) => !prev);
  };

  const totalSectionDuration = (lectures) => {
    return lectures?.reduce(
      (totalDuration, lecture) => totalDuration + lecture.totalTime,
      0
    );
  };

  const totalLectureAndDuration = (sections) => {
    let totalLecture = 0;
    let totalDuration = 0;
    for (const section of sections) {
      totalLecture += section.lectures.length;
      totalDuration += totalSectionDuration(section.lectures);
    }
    return { totalDuration: formatTime(totalDuration), totalLecture };
  };

  const renderCollapsePanelRow = (section) => {
    let formatSection = [];
    section.lectures.forEach(
      (lecture) =>
        (formatSection[lecture.ordinalNumber - 1] = {
          ...lecture,
          type: "lecture",
        })
    );
    section.quizzes.forEach(
      (quizz) =>
        (formatSection[quizz.ordinalNumber - 1] = { ...quizz, type: "quizz" })
    );
    section.assignments.forEach(
      (assignment) =>
        (formatSection[assignment.ordinalNumber - 1] = {
          ...assignment,
          type: "assignment",
        })
    );
    return formatSection;
  };

  return (
    <CourseContentWrapper>
      <Modal
        title="Message"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Typography.Title level={3}>
          You need to buy or enroll this course!
        </Typography.Title>
      </Modal>
      <div className="course-content_header">
        <Typography.Title className="course-content_header-title" level={4}>
          Course content
        </Typography.Title>
        <Space className="course-content_header-ant-space" size={20}>
          <Typography.Text
            onClick={toggleCollapseCourseContent}
            strong
            className="course-content_toggle-collapse"
          >
            {toggleCollapse === true
              ? "Collapse all sections"
              : "Expand all sections"}
          </Typography.Text>
          <Typography.Text style={{ color: "var(--text-color)" }}>
            {totalLectureAndDuration(data.sections).totalLecture} lectures
          </Typography.Text>
          <Typography.Text style={{ color: "var(--text-color)" }}>
            {totalLectureAndDuration(data.sections).totalDuration} total length
          </Typography.Text>
        </Space>
      </div>
      <Collapse
        bordered={false}
        className="course-content_collapse"
        activeKey={collapseKey}
        onChange={panelCollapseActiveHandler}
        expandIcon={() => (
          <FundProjectionScreenOutlined style={{ fontSize: "16px" }} />
        )}
      >
        {data.sections?.map((section, index) => {
          if (arrayCollapseKey.current.length < data.sections.length) {
            arrayCollapseKey.current.push(index.toString());
          }
          const arrayRows = renderCollapsePanelRow(section);

          return (
            <Collapse.Panel
              key={`${index}`}
              header={
                <CollapseHeader
                  title={section.title}
                  totalLectures={section.lectures.length}
                  totalTime={formatTime(totalSectionDuration(section.lectures))}
                />
              }
            >
              {arrayRows.map((row) => (
                <Link
                  key={row.id}
                  onClick={handleRowCourseContentClick}
                  to={
                    courseStatus === "enrolled"
                      ? `/download-course-view/${data.id}#${row.id}`
                      : "#"
                  }
                >
                  <CollapsePanelRow
                    Icon={() =>
                      row.type === "lecture" ? (
                        <PlayCircleOutlined style={{ color: "black" }} />
                      ) : row.type === "quizz" ? (
                        <QuestionCircleOutlined style={{ color: "black" }} />
                      ) : (
                        <FileOutlined style={{ color: "black" }} />
                      )
                    }
                    title={row.title}
                    duration={
                      row.type === "lecture"
                        ? formatTime(row.totalTime)
                        : row.type === "quizz"
                        ? `${row.questions.length} questions`
                        : ""
                    }
                  />
                </Link>
              ))}
            </Collapse.Panel>
          );
        })}
      </Collapse>
    </CourseContentWrapper>
  );
}

export default CourseContent;
