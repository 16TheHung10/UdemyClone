import { LoadingOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Row,
  Typography,
  Upload,
} from "antd";
import { uploadFile } from "apis/features/CreateCourse/CreateCourseAPI";
import { Bin } from "assets/IconComponent";
import { schemaQuestionLine } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "../Modal/ModalLecture.css";
const { Text } = Typography;
export default function EditMultipleLine({
  questions,
  setQuestions,
  questionEdit,
  id,
  handleOkEdit,
}) {
  const [formMultipleLine] = Form.useForm();
  const [fileImg, setFileImg] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  useEffect(() => {
    setFileImg(questionEdit.imageUrl);
  }, [setFileImg, questionEdit]);
  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit,
    reset,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaQuestionLine),
    defaultValues: questionEdit,
  });
  const propsImg = {
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";

      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
        return false;
      } else {
        setLoadingImg(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");
        uploadFile(formData)
          .then((res) => {
            setFileImg(res.data.url);
            setValue("imageUrl", res.data.url);
            setLoadingImg(false);
            clearErrors("imageUrl");
          })
          .catch((err) => {
            setLoadingImg(false);
            message.error(err);
          });
        return false;
      }
    },
    maxCount: 1,
    showUploadList: false,
  };
  const [isDeleteImg, setIsDeleteImg] = useState(false);

  const showModalDeleteImg = () => {
    setIsDeleteImg(true);
  };

  const handleOkImg = () => {
    setIsDeleteImg(false);
  };

  const handleCancelImg = () => {
    setIsDeleteImg(false);
  };

  const renderDeleteImgModal = () => {
    return (
      <Modal
        title={`Do you want to delete this Question Image ?`}
        visible={isDeleteImg}
        onOk={handleOkImg}
        onCancel={handleCancelImg}
        footer={[
          <Button
            key="submit"
            className="btn-red"
            onClick={() => {
              setFileImg("");
              setValue("imageUrl", "");
              message.success("Delete Image Successfully");
              handleOkImg();
            }}
          >
            Yes
          </Button>,
          <Button key="back" onClick={handleCancelImg} className="btn-cancel">
            No
          </Button>,
        ]}
      >
        <p>Click Yes to delete this Question Image or click No to cancel</p>
      </Modal>
    );
  };
  const onSubmit = (data) => {
    const question = getValues();
    question.key = question.title;
    const index = questions.findIndex((item) => {
      return item.title === question.title;
    });
    if (index === -1 || index === id) {
      const tempQuestionList = [...questions];
      tempQuestionList[id] = question;
      setQuestions(tempQuestionList);
      handleOkEdit();
      setFileImg("");
      setValue("imageUrl", "");
      reset();
    } else message.error("Question title was exist");
  };
  return (
    <>
      {renderDeleteImgModal()}
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        form={formMultipleLine}
        onFinish={handleSubmit(onSubmit)}
      >
        <Row className="edit-picture-upload">
          <Col xs={24} md={6} className="padding-all">
            {fileImg ? (
              <div className="uploaded-container">
                <Image width={"10.2rem"} height={"auto"} src={fileImg} />
                <Bin
                  className="delete-img-button"
                  onClick={() => {
                    showModalDeleteImg();
                  }}
                />
              </div>
            ) : (
              <Upload {...propsImg} listType="picture-card">
                {loadingImg ? (
                  <LoadingOutlined className="mg-right text-bold" />
                ) : (
                  <PlusSquareOutlined className="mg-right text-bold" />
                )}
                <Text className="text-bold">Image</Text>
              </Upload>
            )}
            {errors.imageUrl && (
              <Text className="error-message">{errors.imageUrl?.message}</Text>
            )}
          </Col>
          <Col xs={24} md={13} className="padding-all">
            <Form.Item label="Question Title*">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} placeholder="Write title here" />
                    {errors.title && (
                      <Text className="error-message">
                        {errors.title?.message}
                      </Text>
                    )}
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
                    <Input {...field} placeholder="Score" />
                    {errors.score && (
                      <Text className="error-message">
                        {errors.score?.message}
                      </Text>
                    )}
                  </>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button htmlType="submit" className="btn-red mg-top">
          Save Change
        </Button>
      </Form>
    </>
  );
}
