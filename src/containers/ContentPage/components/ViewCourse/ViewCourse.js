import { EyeOutlined } from "@ant-design/icons";
import { Button, Spin, Steps, Typography } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectEditCourseLoading } from "redux/features/edit-course/EditCourseSelector";
import { getCourseById } from "redux/features/edit-course/EditCourseThunk";
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
} from "./ViewCourseStyled";
const { Step } = Steps;

export default function ViewCourse({ id, courseItem }) {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const loadingData = useSelector(selectEditCourseLoading);
  const params = useParams();
  useEffect(() => {
    dispatch(getCourseById(params.id));
  }, [dispatch, params.id]);
  const next = () => {
    setCurrent(current + 1);
  };
  const handleSteps = (value) => {
    setCurrent(value);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "Basic",
      content: <Basic basicDetail={courseItem?.basic} />,
    },
    {
      title: "Curriculum",
      content: <Curriculum sections={courseItem?.sections} />,
    },
    {
      title: "Media",
      content: <Media media={courseItem?.media} />,
    },
    {
      title: "Price",
      content: <Price price={courseItem?.price} />,
    },
    {
      title: "Publish",
      content: <Publish />,
    },
  ];
  return (
    <Spin
      spinning={loadingData}
      delay={500}
      tip="Loading..."
      className="spin-loading"
    >
      <Wrapper>
        <WrapperHeader>
          <EyeOutlined className="plus-icon" />
          <Typography.Text className="text-title">View Course</Typography.Text>
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
                  next();
                }}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button className="btn-red" type="submit" loading={loadingData}>
                Done
              </Button>
            )}
          </WrapperStepAction>
        </WrapperContent>
      </Wrapper>
    </Spin>
  );
}
