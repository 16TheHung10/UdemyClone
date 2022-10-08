import { unwrapResult } from "@reduxjs/toolkit";
import { Col, Layout, Row, Segmented, Spin, Typography } from "antd";
import ReviewsPage from "containers/ContentPage/components/ReviewsPage/ReviewsPage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCourseDetail } from "redux/features/downloadCourseView/DownloadCourseThunk";
import {
  selectorCoursesDetail,
  selectorDownloadCourses,
} from "redux/features/downloadCourseView/DownloadCourseViewSelector";
import Assignment from "./Components/Assignment/Assignment";
import Description from "./Components/Description/Description";
import Header from "./Components/Layouts/Header/Header";
import Note from "./Components/Note/Note";
import Quiz from "./Components/Quiz/Quiz";
import SidebarMenu from "./Components/SidebarMenu/SidebarMenu";
import Video from "./Components/Video/Video";
import { Wrapper } from "./DownloadedCoursesViewStyled";
const { Footer } = Layout;
const { Title } = Typography;
export default function DownloadedCoursesView() {
  const dispatch = useDispatch();
  const courseDetailRedux = useSelector(selectorCoursesDetail);
  console.log(courseDetailRedux);
  const { isLoading } = useSelector(selectorDownloadCourses);
  const [toggleSideBar, setToggleSidebar] = useState(false);
  const [turnBackSideBar, setTurnBackSideBar] = useState("");
  // const [objectNote, setObjectNote] = useState({ time: "", value: "" });
  // const [disabledInput, setDisabledInput] = useState(true);
  const [listNote] = useState([{ time: 30, value: "ol" }]);
  const [selectedSegment, setSelectedSegment] = useState("Description");
  const [selectedLecture, setSelectedLecture] = useState();
  const [controlState, setControlState] = useState({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1,
    fullScreen: false,
    played: 0,
    playedSeconds: 0,
    seeking: false,
  });
  console.log(courseDetailRedux);
  //course state
  const [sections, setSections] = useState();
  //--end course state--
  //ui State
  const [optionsSegment, setOptionSegment] = useState([
    "Description",
    "Review",
  ]);
  const [indexOfCurrentLecture, setIndexOfCurrentLecture] = useState(
    selectedLecture?.ordinalNumber || 0
  );
  const [indexOfCurrentSection, setIndexOfCurrentSection] = useState(0);
  const [disabledPre, setDisabledPre] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);
  const playerRef = useRef();

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  //Function Take Note
  // const onTakeNote = () => {
  //   setDisabledInput(false);
  //   setControlState({ ...controlState, playing: false });
  // };
  // const onSubmitTakeNote = (e) => {
  //   e.preventDefault();
  //   setDisabledInput(true);
  //   setControlState({ ...controlState, playing: true });
  //   setListNote((listNote) => [...listNote, objectNote]);
  //   setObjectNote({});
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };
  // const handleChangeTakeNote = (e) => {
  //   setObjectNote({
  //     ...objectNote,
  //     time: parseInt(playedSeconds),
  //     value: e.target.value,
  //     title: selectedLecture.title,
  //   });
  // };
  const seekToNote = (time) => {
    playerRef.current.seekTo(time, "seconds");
    setControlState({ ...controlState, playing: false });
  };
  //End function take Note

  const renderSegmentContent = () => {
    switch (selectedSegment) {
      case "Description":
        return <Description description={selectedLecture?.description} />;
      case "Note":
        return (
          <Note
            listNote={listNote.filter(
              (item) => item.title === selectedLecture.title
            )}
            title={selectedLecture.title}
            seekToNote={seekToNote}
          />
        );
      case "Review":
        return <ReviewsPage 
              courseTitle={courseDetailRedux?.title}
              courseId={courseDetailRedux?.id}
              authorId={courseDetailRedux?.user?.id}
              />;
      default:
        return;
    }
  };
  useEffect(() => {
    if (sections) {
      let indexOfSection = sections?.findIndex((section) => {
        for (let lecture of section.newData) {
          if (lecture.id === selectedLecture?.id) {
            return true;
          } else {
            continue;
          }
        }
        return false;
      });
      let indexOfLecture = selectedLecture?.ordinalNumber - 1;

      setIndexOfCurrentSection(indexOfSection);
      setIndexOfCurrentLecture(indexOfLecture);

      if (indexOfSection === 0 && indexOfLecture === 0) {
        setDisabledPre(true);
      } else {
        setDisabledPre(false);
      }
      if (
        indexOfSection === sections.length - 1 &&
        indexOfLecture === sections[indexOfSection].newData.length - 1
      ) {
        setDisabledNext(true);
      } else {
        setDisabledNext(false);
      }
    }
  }, [selectedLecture, sections, location.hash]);
  const handleNextPreviousVideo = (condition) => {
    if (condition === "previous") {
      if (indexOfCurrentSection === 0 && indexOfCurrentLecture === 0) {
        return;
      } else {
        if (indexOfCurrentLecture > 0) {
          navigate(
            `/download-course-view/${params.id}#${
              sections[indexOfCurrentSection].newData[indexOfCurrentLecture - 1]
                .id
            }`
          );
        } else if (selectedLecture.ordinalNumber - 1 === 0) {
          while (sections[indexOfCurrentSection - 1]?.newData.length === 0) {
            setIndexOfCurrentSection(
              (indexOfCurrentSection) => indexOfCurrentSection - 1
            );
            if (!sections[indexOfCurrentSection - 1]) {
              return;
            }
          }
          navigate(
            `/download-course-view/${params.id}#${
              sections[indexOfCurrentSection - 1].newData[
                sections[indexOfCurrentSection - 1].newData.length - 1
              ].id
            }`
          );
        }
      }
    }
    if (condition === "next") {
      if (
        indexOfCurrentSection === sections.length - 1 &&
        indexOfCurrentLecture ===
          sections[indexOfCurrentSection].newData.length - 1
      ) {
        return;
      } else {
        if (
          indexOfCurrentLecture <
          sections[indexOfCurrentSection].newData.length - 1
        ) {
          navigate(
            `/download-course-view/${params.id}#${
              sections[indexOfCurrentSection].newData[indexOfCurrentLecture + 1]
                .id
            }`
          );
        } else if (
          indexOfCurrentLecture ===
          sections[indexOfCurrentSection].newData.length - 1
        ) {
          while (sections[indexOfCurrentSection + 1]?.newData.length === 0) {
            setIndexOfCurrentSection(
              (indexOfCurrentSection) => indexOfCurrentSection + 1
            );
            if (!sections[indexOfCurrentSection + 1]) {
              return;
            }
          }
          navigate(
            `/download-course-view/${params.id}#${
              sections[indexOfCurrentSection + 1]?.newData[0].id
            }`
          );
        }
      }
    }
  };
  const handleCallAPISuccess = (data) => {
    if (data) {
      setSections(data.sections);
    }
  };
  const handleSelectLecture = (sectionID, lectureID) => {
    //for click lecture on sidebar
    let section = sections.find((section) => {
      return section.id === sectionID;
    });
    let lecture = section.lectures.find((lecture) => {
      return lecture.id === lectureID;
    });
    setSelectedLecture(lecture);
  };
  const handleSelectLectureByParam = (lecture) => {
    setSelectedLecture(lecture);
  };
  const mergeLectureAssignmentQuiz = (sections) => {
    let temp = [];
    if (sections) {
      temp = JSON.parse(JSON.stringify(sections));
    }
    for (let section of temp) {
      section.newData = [];
      for (let assignment of section.assignments) {
        section.newData?.push({ ...assignment, type: "assignment" });
      }
      for (let lecture of section.lectures) {
        section.newData?.push({ ...lecture, type: "lecture" });
      }
      for (let quiz of section.quizzes) {
        section.newData?.push({ ...quiz, type: "quiz" });
      }
    }
    return temp;
  };
  useEffect(() => {
    if (
      selectedLecture?.type === "quiz" ||
      selectedLecture?.type === "assignment"
    ) {
      setOptionSegment(["Description", "Review"]);
    }
  }, [selectedLecture]);
  const fetchCourseDetail = async () => {
    try {
      const resultAction = await dispatch(getCourseDetail(params.id));
      const data = unwrapResult(resultAction);
      handleCallAPISuccess(data);
      setSections(mergeLectureAssignmentQuiz(data.sections));
      setSelectedLecture(
        mergeLectureAssignmentQuiz(data.sections)[0]?.newData.sort(
          (a, b) => a.ordinalNumber - b.ordinalNumber
        )[0]
      );
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    fetchCourseDetail();
  }, []);
  const handleToggleSideBar = () => {
    setToggleSidebar((toggleSideBar) => !toggleSideBar);
  };
  const handleHideSideBar = () => {
    setToggleSidebar(false);
  };
  const renderContentViaType = () => {
    switch (selectedLecture?.type) {
      case "lecture":
        return <Video selectedLecture={selectedLecture} listNote={listNote} />;
      case "assignment":
        return <Assignment assignment={selectedLecture} />;
      case "quiz":
        return <Quiz quizzes={selectedLecture} />;
      default:
        return;
    }
  };
  return (
    <Spin
      spinning={isLoading}
      delay={500}
      tip="Loading..."
      className="spin-loading"
    >
      <Wrapper>
        <Row className="download" wrap={true}>
          <Header
            toggleSideBar={toggleSideBar}
            handleToggleSideBar={handleToggleSideBar}
            handleNextPreviousVideo={handleNextPreviousVideo}
            disabledPre={disabledPre}
            disabledNext={disabledNext}
          />
          <Col span={24}>
            <Row style={{ marginTop: "5rem" }}>
              <div
                className={` ${
                  toggleSideBar ? "transform-back" : ""
                } download-lesson download-sidebar`}
              >
                <div className="download-sidebar-content">
                  <Title className="download-lesson-title" level={5}>
                    {courseDetailRedux?.title}
                  </Title>

                  <SidebarMenu
                    menuList={sections}
                    selectedLecture={selectedLecture}
                    handleSelectLecture={handleSelectLecture}
                    courseID={params.id}
                    handleSelectLectureByParam={handleSelectLectureByParam}
                    location={location}
                    handleHideSideBar={handleHideSideBar}
                  />
                </div>
              </div>
              <div className="player-content">
                <Col
                  sm={24}
                  onClick={() => {
                    if (turnBackSideBar !== "") setTurnBackSideBar("");
                  }}
                >
                  {renderContentViaType()}
                  <Row>
                    <Col span={24}>
                      <Footer className="footer">
                        {/* {selectedLecture?.type === "lecture" && (
                        <div className="take-note">
                          <form onSubmit={onSubmitTakeNote}>
                            <Search
                              placeholder="Ghi chú..."
                              enterButton={
                                <Button
                                  onClick={
                                    disabledInput
                                      ? onTakeNote
                                      : onSubmitTakeNote
                                  }
                                >
                                  Thêm ghi chú tại:{" "}
                                  {formatTime(parseInt(playedSeconds))}
                                </Button>
                              }
                              size="large"
                              value={objectNote.value}
                              loading={loading}
                              disabled={disabledInput}
                              onChange={handleChangeTakeNote}
                            />
                          </form>
                        </div>
                      )} */}
                        <Segmented
                          onChange={(value) => setSelectedSegment(value)}
                          block
                          options={optionsSegment}
                        />
                        <div className="segment-content">
                          {renderSegmentContent()}
                        </div>
                      </Footer>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Col>
        </Row>
      </Wrapper>
    </Spin>
  );
}
