import { MailOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Typography,
  Modal,
  Spin,
} from "antd";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "hooks/useAuth";
const { Title } = Typography;

// Schema yup
const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Format must be an e-mail")
      .trim(),
  })
  .required();

// Component
export default function ForgotPassPage() {
  const { errorsMsg, forgotPassword, isLoading } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const [secondsToGo, setSecondsToGo] = useState(5);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // handle submit form
  const onFinish = async (values) => {
    await forgotPassword(values.email.trim(), showModal);
    reset();
  };

  const showModal = () => {
    setVisible(true);
    const timer = setInterval(() => {
      setSecondsToGo((secondsToGo) => secondsToGo - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
    }, 5 * 1000);
  };

  useEffect(() => {
    if (secondsToGo === 0) {
      hideModal();
      navigate("/");
    }
  }, [secondsToGo]);

  const hideModal = () => {
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Col span={24} md={8}>
      <Modal
        title="Your request has been accepted"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
      >
        <p>Your forgot password confirmation.</p>
        <p>
          We just sent to your email an link which contains reset password link.{" "}
        </p>
        <p>You need to access into that link and update your password.</p>
        <p>This page will be redirect to Home Page in {secondsToGo} seconds</p>
      </Modal>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form
          className="form-basic form-login"
          name="basic"
          onFinish={handleSubmit(onFinish)}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Title className="headerForm" level={3}>
            Welcome Back
          </Title>
          <p className="subHeader">Forgot password of your Edututs+ Account!</p>
          {errorsMsg !== "" && <Alert message={errorsMsg} type={"error"} />}

          <Form.Item
            validateStatus={errors.email ? "error" : ""}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  prefix={<MailOutlined />}
                  className="formInput"
                  placeholder="Email Address"
                  {...field}
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="signInBtn socialBtn"
              loading={isSubmitting}
              block
              htmlType="submit"
            >
              Confirm your email
            </Button>
          </Form.Item>

          <Form.Item>
            <p className="forgotPass">
              {`or `}
              <span>Sign up new account</span>
            </p>
          </Form.Item>

          <Divider />

          <Form.Item>
            <p className="signUpAcc">
              <span onClick={() => navigate("/sign-in")}>Or Sign In</span>
            </p>
          </Form.Item>
        </Form>
      </Spin>
    </Col>
  );
}
