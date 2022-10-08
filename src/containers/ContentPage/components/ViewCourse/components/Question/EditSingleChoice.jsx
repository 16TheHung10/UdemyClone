import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Image, Input, Row, Switch, Typography } from "antd";
import { schemaQuestionChoice } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "../Modal/ModalLecture.css";
const { Title } = Typography;
export default function EditSingleChoice({
  questions,
  setQuestions,
  questionEdit,
  id,
  handleOkEdit,
}) {
  const [formSingleChoice] = Form.useForm();
  const [fileImg, setFileImg] = useState("");
  useEffect(() => {
    setFileImg(questionEdit.imageUrl);
  }, [setFileImg, questionEdit]);
  const { control } = useForm({
    resolver: yupResolver(schemaQuestionChoice),
    defaultValues: questionEdit,
  });
  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        form={formSingleChoice}
      >
        <Row className="edit-picture-upload">
          <Col xs={24} md={6} className="padding-all">
            {fileImg ? (
              <div className="uploaded-container">
                <Image width={"10.2rem"} height={"auto"} src={fileImg} />
              </div>
            ) : null}
          </Col>
          <Col xs={24} md={13} className="padding-all">
            <Form.Item label="Question Title*">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} readOnly placeholder="Write title here" />
                  </>
                )}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={5} className="padding-all">
            <Form.Item label="Score*">
              <Controller
                name="score"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} readOnly placeholder="Score" />
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <div>
          <Form.List name="options" initialValue={questionEdit.options}>
            {(fields, { add, remove }, { errors }) => {
              return (
                <div>
                  <Title level={5}>Options</Title>
                  {fields.map((field, index) => {
                    return (
                      <div
                        className="option-container mg-y"
                        key={`${field.key}a`}
                      >
                        <div className="display-flex option-header padding-y  padding-x-2 justify-content-between align-item-center">
                          <Title level={5}>{index + 1}. Option</Title>
                        </div>
                        <div className="padding-y  padding-x-2">
                          <Form.Item label="Option Title*">
                            <Form.Item
                              {...field}
                              noStyle
                              key={`titleOption${index}`}
                              name={[field.name, "title"]}
                              validateTrigger={["onChange", "onBlur"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your option!",
                                },
                              ]}
                              fieldKey={[field.fieldKey, "title"]}
                            >
                              <Input
                                readOnly
                                placeholder="Write option title here"
                              />
                            </Form.Item>
                          </Form.Item>
                          <Form.Item label="Correct Answer*">
                            <Form.Item
                              {...field}
                              noStyle
                              key={`isCorrectOption${index}`}
                              name={[field.name, "isCorrectAnswer"]}
                              initialValue={false}
                              valuePropName="checked"
                              fieldKey={[field.fieldKey, "isCorrectAnswer"]}
                            >
                              <Switch disabled />
                            </Form.Item>
                          </Form.Item>
                          <Form.ErrorList errors={errors} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </Form.List>
        </div>
      </Form>
    </>
  );
}
