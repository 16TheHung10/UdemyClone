import { KeyOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Spin,
  Typography,
} from "antd";
import { useAuthContext } from "hooks/useAuth";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

const { Title } = Typography;

// Schema yup
const schema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Minimum must be greater 8 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password has at least 1 uppercase, 1 digit, 1 special character and minimum 8 in length"
      ),
    confirm: yup
      .string()
      .required("You need to confirm password")
      .oneOf(
        [yup.ref("password"), null],
        "Confirm password must be matched with password"
      ),
  })
  .required();

// Component
export default function ResetPasswordPage() {
  const { errorsMsg, resetPassword, isLoading } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const [secondsToGo, setSecondsToGo] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      confirm: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // handle submit form
  const onFinish = async (values) => {
    await resetPassword(
      {
        Email: new URLSearchParams(location.search).get("email")?.toString(),
        Token: location.search.substring(
          location.search.lastIndexOf("token=") + 6
        ),
        Password: values.password.trim(),
        ConfirmPassword: values.password.trim(),
      },
      showModal
    );
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
      navigate(
        `/sign-in?email=${new URLSearchParams(location.search)
          .get("email")
          ?.toString()}&name=${new URLSearchParams(location.search)
          .get("name")
          ?.toString()}`
      );
    }
  }, [secondsToGo]);

  const hideModal = () => {
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Col span={24} md={8}>
      <Modal
        title="Reset password successfully"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
        footer={null}
      >
        <p>Your changing password confirmation.</p>
        <p>We has reset your password. </p>
        <p>Now, you can sign in with new password.</p>
        <p>This page will be redirect to Login Page in {secondsToGo} seconds</p>
      </Modal>
      <Spin tip="Loading..." spinning={isLoading}></Spin>
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
        <h2 style={{ color: "#ed2a26", textAlign: "center" }}>
          {new URLSearchParams(location.search).get("name")?.toString()}
        </h2>
        <p style={{ marginBottom: "10px" }} className="subHeader">
          Please enter new password of your Edututs+ Account with email
        </p>
        <p style={{ color: "#ed2a26", textAlign: "center" }}>
          {new URLSearchParams(location.search).get("email")?.toString()}
        </p>
        {errorsMsg !== "" && <Alert message={errorsMsg} type={"error"} />}

        <Form.Item
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input.Password
                {...register("password")}
                prefix={<KeyOutlined />}
                className="formInput"
                placeholder="Password"
                {...field}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          validateStatus={errors.confirm ? "error" : ""}
          help={errors.confirm?.message}
        >
          <Controller
            name="confirm"
            control={control}
            render={({ field }) => (
              <Input.Password
                {...register("confirm")}
                prefix={<KeyOutlined />}
                className="formInput"
                placeholder="Confirm Password"
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
            Change password
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
            <span onClick={() => navigate("/sign-in")}> Sign In</span>
          </p>
        </Form.Item>
      </Form>
    </Col>
  );
}
