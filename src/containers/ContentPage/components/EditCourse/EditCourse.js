import { FormOutlined } from "@ant-design/icons";
import { Button, message, Modal, Result, Spin, Steps, Typography } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  selectCourseItem,
  selectEditCourseLoading,
  selectEditCourseSuccess,
  selectSections,
} from "redux/features/edit-course/EditCourseSelector";
import { editCourseAction } from "redux/features/edit-course/EditCourseSlice";
import {
  editCourse,
  getCourseById,
} from "redux/features/edit-course/EditCourseThunk";
import Basic from "./components/Basic.jsx/Basic";
import Curriculum from "./components/Curriculum/Curriculum";
import Media from "./components/Media/Media";
import Price from "./components/Price/Price";
import Publish from "./components/Publish/Publish";
import {
  Wrapper,
  WrapperContent,
  WrapperHeader,
  WrapperStepAction,
  WrapperStepContent,
  WrapperStepIcon,
} from "./EditCourseStyled";
const { Step } = Steps;

export default function EditCourse() {
  const [current, setCurrent] = useState(0);
  const [submitRef, setSubmitRef] = useState({});
  const courseItem = useSelector(selectCourseItem);
  const sections = useSelector(selectSections);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [secondsToGo, setSecondsToGo] = useState(3);
  const loadingData = useSelector(selectEditCourseLoading);
  const editSuccess = useSelector(selectEditCourseSuccess);
  const params = useParams();
  useEffect(() => {
    dispatch(getCourseById(params.id));
  }, [dispatch, params.id]);
  const getAllSubmitRef = (ref) => {
    setSubmitRef((prevRef) => ({ ...prevRef, ref }));
  };
  const next = () => {
    setCurrent(current + 1);
  };
  const handleSteps = (value) => {
    setCurrent(value);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const handleData = (data) => {
    if (!!submitRef && current !== 1) {
      submitRef.ref[steps[current].title]?.current?.click();
      if (!!data) {
        if (steps[current].title === "Basic")
          dispatch(editCourseAction.editBasic(data));
        if (steps[current].title === "Media")
          dispatch(editCourseAction.createMedia(data));
        if (steps[current].title === "Price")
          dispatch(editCourseAction.createPrice(data));
        next();
      }
    }
    if (current === 1) {
      if (sections.length > 0 && sections[0]?.contents.length > 0) {
        next();
      } else {
        message.error("Please Add Section");
      }
    }
  };
  const steps = [
    {
      title: "Basic",
      content: (
        <Basic handleData={handleData} getAllSubmitRef={getAllSubmitRef} />
      ),
    },
    {
      title: "Curriculum",
      content: <Curriculum />,
    },
    {
      title: "Media",
      content: (
        <Media handleData={handleData} getAllSubmitRef={getAllSubmitRef} />
      ),
    },
    {
      title: "Price",
      content: (
        <Price handleData={handleData} getAllSubmitRef={getAllSubmitRef} />
      ),
    },
    {
      title: "Publish",
      content: <Publish />,
    },
  ];
  const showModal = () => {
    setVisible(true);
    const timer = setInterval(() => {
      setSecondsToGo((secondsToGo) => secondsToGo - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, 3 * 1000);
  };
  const hideModal = () => {
    setVisible(false);
  };
  if (editSuccess) {
    dispatch(editCourseAction.resetEditSuccess());
    showModal();
  }
  useEffect(() => {
    if (secondsToGo === 0) {
      navigate("/dashboard/instructor_courses");
    }
  }, [secondsToGo]);
  const handleSubmitData = () => {
    dispatch(editCourse(courseItem));
  };
  return (
    <Spin
      spinning={loadingData}
      delay={500}
      tip="Loading..."
      className="spin-loading"
    >
      <Wrapper>
        <Modal
          title="Edit Course Successfully"
          visible={visible}
          onOk={hideModal}
          onCancel={hideModal}
          okText="Ok"
          footer={null}
        >
          <Result
            status="success"
            title="Your course has been edited!"
            subTitle={`You will be move to Course Management Page in ${secondsToGo}
    seconds`}
          />
        </Modal>
        <WrapperHeader>
          <FormOutlined className="plus-icon" />
          <Typography.Text className="text-title">Edit Course</Typography.Text>
        </WrapperHeader>
        <WrapperContent>
          <WrapperStepIcon>
            <Steps current={current} onChange={handleSteps}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
          </WrapperStepIcon>
          <WrapperStepContent className="steps-content">
            {steps[current].content}
          </WrapperStepContent>
          <WrapperStepAction className="steps-action">
            {current > 0 && (
              <Button className="btn-red" onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                className="btn-red"
                type="submit"
                onClick={() => {
                  handleData();
                }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                className="btn-red"
                type="submit"
                onClick={() => {
                  handleSubmitData();
                }}
                loading={loadingData}
              >
                Done
              </Button>
            )}
          </WrapperStepAction>
        </WrapperContent>
      </Wrapper>
    </Spin>
  );
}
