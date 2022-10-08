import { CheckCircleOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  message,
  Row,
  Switch,
  Tabs,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  DotIcon,
  LectureIcon,
  QuestionIcon,
  SettingIcon,
} from "assets/IconComponent";
import { schemaQuiz } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCourseAction } from "redux/features/create-course/CreateCourseSlice";
import MultiChoice from "../Question/MultipleChoice";
import QuestionList from "../Question/QuestionList";
import SingleChoice from "../Question/SingleChoice";
import "./ModalLecture.css";
const { Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;
export default function EditQuiz({
  id,
  idEdit,
  handleOkEdit,
  contentEdit,
  contents,
}) {
  const dispatch = useDispatch();
  const [formBasic, formSetting] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [activeKey, setActiveKey] = useState("1");
  useEffect(() => {
    setQuestions([...contentEdit.questions]);
  }, []);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaQuiz),
    defaultValues: contentEdit,
  });
  useEffect(() => {
    if ((errors?.title || errors?.description) && !errors?.questions) {
      setActiveKey("1");
    } else if (errors?.questions && !errors?.title && !errors?.description) {
      setActiveKey("2");
    } else if (
      (errors?.timeLimit || errors?.passingScore || errors?.questionsLimit) &&
      !errors?.questions &&
      !errors?.title &&
      !errors?.description
    ) {
      setActiveKey("3");
    } else if (
      !errors?.timeLimit &&
      !errors?.passingScore &&
      !errors?.questionsLimit &&
      (errors?.questions || errors?.title || errors?.description)
    ) {
      setActiveKey("1");
    }
  }, [errors]);

  const onSubmit = (data) => {
    const index = contents.findIndex((item) => {
      return item.title === data.title;
    });
    if (index === -1 || index === idEdit) {
      dispatch(createCourseAction.updateContent({ data, id, idEdit }));
      handleOkEdit();
      reset();
      setQuestions([]);
    } else message.error("Title was exist in this Section");
  };

  return (
    <>
      <Tabs
        type="card"
        className="tab-payment"
        onTabClick={(key) => {
          setActiveKey(key);
        }}
        activeKey={activeKey}
      >
        <TabPane
          tab={
            <>
              <LectureIcon className="lecture-icon" />
              <Text>Basic*</Text>
            </>
          }
          key="1"
        >
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            form={formBasic}
            onFinish={handleSubmit(onSubmit)}
          >
            <Form.Item label="Quiz Title*">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Title here" />
                    {errors.title && (
                      <p className="error-message">{errors.title?.message}</p>
                    )}
                  </>
                )}
              />
            </Form.Item>
            <Form.Item label="Description*">
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <TextArea
                      showCount
                      {...field}
                      placeholder="Description here..."
                      maxLength={220}
                      autoSize={{ minRows: 5, maxRows: 5 }}
                    />
                    {errors.description && (
                      <p className="error-message">
                        {errors.description?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane
          tab={
            <>
              <QuestionIcon className="lecture-icon" />
              <Text>Question*</Text>
            </>
          }
          key="2"
        >
          <Collapse ghost className="collapse-question">
            <Panel
              header={
                <div className="display-flex justify-content-center width-full align-item-center">
                  <PlusSquareOutlined className="mg-right text-bold" />
                  <Text className="text-bold">Add Question</Text>
                </div>
              }
              key="1"
              showArrow={false}
            >
              <Text className="text-gray">Question Type</Text>
              <Tabs type="card" className="card-video-type">
                <TabPane
                  tab={
                    <>
                      <DotIcon className="lecture-icon" />
                      <Text>Single Choice</Text>
                    </>
                  }
                  key="1"
                >
                  <SingleChoice
                    questions={questions}
                    setQuestions={setQuestions}
                    clearQuestions={clearErrors}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <CheckCircleOutlined className="lecture-icon" />
                      <Text>Multiple Choice</Text>
                    </>
                  }
                  key="2"
                >
                  <MultiChoice
                    questions={questions}
                    setQuestions={setQuestions}
                    clearQuestions={clearErrors}
                  />
                </TabPane>
                {/* <TabPane
                  tab={
                    <>
                      <EditIcon className="lecture-icon" />
                      <Text>Single Line Text</Text>
                    </>
                  }
                  key="3"
                >
                  <SingleLine
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                </TabPane>
                <TabPane
                  tab={
                    <>
                      <DocumentIcon className="lecture-icon" />
                      <Text>Multi Line Text</Text>
                    </>
                  }
                  key="4"
                >
                  <MultiLine
                    questions={questions}
                    setQuestions={setQuestions}
                  />
                </TabPane> */}
              </Tabs>
            </Panel>
          </Collapse>
          <Divider />
          <div className="mg-top">
            <Text className="text-bold mg-left">Question List</Text>
            <QuestionList
              id={id}
              questions={questions}
              setQuestions={setQuestions}
            />
            {errors.questions && (
              <p className="error-message">{errors.questions?.message}</p>
            )}
          </div>
        </TabPane>
        <TabPane
          tab={
            <>
              <SettingIcon className="lecture-icon" />
              <Text>Setting*</Text>
            </>
          }
          key="3"
        >
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            layout="vertical"
            form={formSetting}
            onFinish={handleSubmit(onSubmit)}
          >
            <Form.Item label="Gradable">
              <Controller
                name="isGradable"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <div className="mg-bottom">
                        <Switch {...field} checked={field.value} />
                        <Text className="text-bold"> Quiz Gradable</Text>
                      </div>
                      <br />
                      <div>
                        <Text className="text-gray">
                          If this quiz test affect on the students grading
                          system for this course.
                        </Text>
                      </div>
                    </>
                  );
                }}
              />
            </Form.Item>

            <Form.Item label="Remaining time display">
              <Controller
                name="isShowTime"
                control={control}
                render={({ field }) => {
                  return (
                    <>
                      <Switch {...field} checked={field.value} />
                      <Text className="text-bold"> Show Time</Text>
                      <br />
                      <br />
                      <Text className="text-gray">
                        By enabling this option, quiz taker will show remaining
                        time during attempt.
                      </Text>
                    </>
                  );
                }}
              />
            </Form.Item>
            <Row>
              <Col md={8} className="padding-1">
                <Form.Item label="Time Limit*">
                  <Controller
                    name="timeLimit"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} placeholder="Enter Minutes" />
                        <Text className="text-gray">
                          Set zero to disable time limit.
                        </Text>
                        {errors.timeLimit && (
                          <p className="error-message">
                            {errors.timeLimit?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col md={8} className="padding-1">
                <Form.Item label="Passing Score(%)*">
                  <Controller
                    name="passingScore"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} placeholder="Enter Passing Score" />
                        <Text className="text-gray">
                          Student have to collect this score in percent for the
                          pass this quiz.
                        </Text>
                        {errors.passingScore && (
                          <p className="error-message">
                            {errors.passingScore?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col md={8} className="padding-1">
                <Form.Item label="Questions Limit(%)*">
                  <Controller
                    name="questionsLimit"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} placeholder="Enter Questions Limit" />
                        <Text className="text-gray">
                          The number of questions student have to answer in this
                          quiz.
                        </Text>
                        {errors.questionsLimit && (
                          <p className="error-message">
                            {errors.questionsLimit?.message}
                          </p>
                        )}
                      </>
                    )}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
      <Divider />
      <Button
        htmlType="submit"
        onClick={() => {
          setValue("questions", questions);
          formBasic.submit();
        }}
        className="btn-red mg-top"
      >
        Edit Quiz
      </Button>
    </>
  );
}
