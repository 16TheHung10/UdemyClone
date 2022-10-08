import Wrapper from "./SendFeedbackPageStyled";
import { ReactComponent as ReportLogo } from "assets/svg/reportIcon.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Select, Upload, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

// upload file
const { Dragger } = Upload;
const draggerProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
// End upload file

// Schema yup
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Format must be an e-mail"),
    description: yup.string().min(20, "Minimum must be greater 20 characters"),
  })
  .required();

// Component

export default function SendFeedbackPage() {
  // UseForm hook
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const onFinish = (values) => {
  };

  const onFinishFailed = (errorInfo) => {
  };

  return (
    <Wrapper>
      <h2 className="headerSendFeedback">
        <ReportLogo /> Send Feedback
      </h2>

      {/* Form Area */}
      <Form
        name="basic"
        onFinish={handleSubmit(onFinish)}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        {/* Email */}
        <Form.Item
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                className="formInput"
                placeholder="Email address"
                {...field}
              />
            )}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                className="formInput"
                placeholder="Describe your issue or share your ideas"
                {...field}
              />
            )}
          />
        </Form.Item>

        {/* Upload file */}
        <Form.Item>
          <h4 className="titleFeild">Add Screenshots</h4>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <CloudUploadOutlined />
            </p>
            <p className="ant-upload-text">
              Select screenshots to upload
            </p>
            <p className="ant-upload-hint">
              or drag and drop screenshots
            </p>
          </Dragger>
        </Form.Item>


        {/* Submit button */}
        <Form.Item>
          <Button className="submitBtn" htmlType="submit">
            Send Feedback
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
}
