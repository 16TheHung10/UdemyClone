import {
  Checkbox,
  Col,
  Image,
  Radio,
  Row,
  Space,
  Typography,
  Input,
} from "antd";
import { Data } from "assets/IconComponent";
import { ButtonStyled } from "components/Button/ButtonStyled";
import React, { useState } from "react";
import { QuizWrapper } from "./QuizStyled";
const { Title, Paragraph } = Typography;
export default function Quiz({ quizzes }) {
  const { description, questions } = quizzes;
  const [checkedBox, setCheckedBox] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [valueSelectedCheckBox, setValueSelectedCheckBox] = useState([]);
  const [selectedCheckBox, setSelectedCheckBox] = useState([]);
  const [selectedRadioBox, setSelectedRadioBox] = useState(null);
  const [valueRadioBox, setValueSelectedRadioBox] = useState([]);
  const [listAnswer, setListAnswer] = useState([]);
  const [testState, setTestState] = useState([]);
  const onChangeSingleChoice = (e, questionId) => {
    setSelectedRadioBox(e.target.value);
    let temp = { ...e.target.value, questionId };
    setValueSelectedRadioBox(temp);
  };

  console.log("selectedRadioBox", selectedRadioBox);
  console.log("valueRadioBox", valueRadioBox);

  const onChangeMultipleChoice = (checkedValue, questionId) => {
    setSelectedCheckBox(checkedValue);
    let temp = { ...checkedValue, questionId };
    setValueSelectedCheckBox(temp);
  };
  const handleSubmit = (e) => {
    let count = 0;
    e.preventDefault();
    for (let answer of listAnswer) {
      let check = 0;
      for (let item of answer.answer) {
        if (item.isCorrectAnswer) {
          check = 1;
        } else check = 0;
      }
      count += check;
    }
    return count;
  };
  console.log("selectedRadio", selectedCheckBox, selectedRadioBox);

  const renderQuestionType = (question) => {
    switch (question.type) {
      case "Single Choice":
        return (
          <Space direction="vertical">
            <Radio.Group
              onChange={(e) => {
                onChangeSingleChoice(e, question.id);
              }}
              value={selectedRadioBox}
            >
              {question.options.map((option, index) => {
                return (
                  <Radio key={`answer-${index}`} value={option}>
                    <Title level={5}>{option.title}</Title>
                  </Radio>
                );
              })}
            </Radio.Group>
          </Space>
        );
      case "Multiple Choice":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
            }}
            onChange={(checkedValue) => {
              onChangeMultipleChoice(checkedValue, question.id);
            }}
            value={selectedCheckBox}
          >
            <Space direction="vertical">
              {question.options.map((option, index) => {
                return (
                  <Checkbox key={`checkbox-${index}`} value={option}>
                    {option.title}
                  </Checkbox>
                );
              })}
            </Space>
          </Checkbox.Group>
        );
      case "Single Line":
        return <Input placeholder="Enter your answer" />;
      case "Multiple Line":
        return <Input.TextArea placeholder="Enter your answer" row={6} />;
      default:
        return;
    }
  };
  const renderQuestion = () => {
    const html = questions.map((question, index) => {
      return (
        <div className="question-item" key={`question-${index}`}>
          <Row>
            <Title level={5}>
              Question {index + 1} : {question.title}
            </Title>
          </Row>
          <Row gutter={[32, 16]}>
            <Col span={6}>
              <Space direction="vertical" className="quizz-content">
                <Image width="100%" height="100%" src={question.imageUrl} />
              </Space>
            </Col>
            <Col span={18}>{renderQuestionType(question)}</Col>
          </Row>
        </div>
      );
    });
    return html;
  };
  return (
    <QuizWrapper>
      {quizzes?.questions.length !== 0 ? (
        <>
          <Row className="quizz">
            <Space direction="vertical" className="quizz-header">
              <Title className="quizz-title" level={2}>
                Quizz - {description || "Quizz Title"}
              </Title>
            </Space>
          </Row>
          <form onSubmit={handleSubmit}>
            {renderQuestion()}
            <ButtonStyled htmlType="submit">Submit</ButtonStyled>
          </form>
        </>
      ) : (
        <div className="no-quizzes">
          <Data width={50} height={50} fill="#f0f2f5" />
          <Paragraph>Have no quizzes</Paragraph>
        </div>
      )}
    </QuizWrapper>
  );
}
