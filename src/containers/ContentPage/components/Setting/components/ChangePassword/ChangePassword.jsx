import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import { changePassword } from "apis/features/CommonAPI/AuthApi";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectUser } from "redux/features/auth/AuthSelector";
import { RedButtonDetailPage } from "Theme/GlobalStyles";
import AuthUtils from "utils/AuthUtils";
import * as yup from "yup";
import ChangePasswordWrapper from "./ChangePasswordStyled";

const schema = yup
  .object({
    currentPassword: yup
      .string()
      .min(8, "Password length should be at least 8 characters")
      .required("Current password is required"),
    newPassword: yup
      .string()
      .min(8, "New password length should be at least 8 characters")
      .matches(
        /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .required("New password is required"),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "Password do not match")
      .required("Confirm new password is required"),
  })
  .required();

function ChangePassword(props) {
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const userProfile = useSelector(selectUser);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //form data
  const onSubmit = async (values) => {
    try {
      const response = await changePassword({
        email: userProfile.email,
        currentlyPassword: values.currentPassword,
        password: values.newPassword,
        ConfirmPassword: values.confirmNewPassword,
      });

      const { isSuccess, message } = response?.data;

      if (!isSuccess) {
        setErrorMsg(message);
      } else {
        setVisible(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setErrorMsg(error.response.data.message);
        return;
      }
      setErrorMsg(error.message);
    }
  };

  const signOutAllDevices = () => {
    //call API sign out all devices
    AuthUtils.logout();
  };

  const hideModal = () => {
    reset();
    setVisible(false);
  };
  return (
    <ChangePasswordWrapper>
      <Modal
        title="Change your password successfully"
        visible={visible}
        onCancel={hideModal}
        maskClosable={false}
        footer={null}
      >
        <p>Now you can use new password to login.</p>
        <p>
          This will log you out of Cursus from all devices where you are
          currently signed in to ensure the security of your account.
        </p>
        <p>Do you want to logout ?</p>
        <Row className="d-flex justify-content-end">
          <Col className="mg-right">
            <Button
              onClick={hideModal}
              className="btn-secondary btn-outlined"
              block
              htmlType="button"
            >
              Keep loging
            </Button>
          </Col>
          <Col>
            <Button
              className="btn-red"
              onClick={signOutAllDevices}
              block
              htmlType="button"
            >
              Sign out
            </Button>
          </Col>
        </Row>
      </Modal>
      <Form onFinish={handleSubmit(onSubmit)}>
        <Space direction="vertical" className="change-password_space" size={16}>
          <Space direction="vertical" className="change-password_space">
            <Typography.Title level={4}>Change Password</Typography.Title>
            <Typography.Text style={{ color: "var(--text-color)" }}>
              Change your account password here.
            </Typography.Text>
          </Space>
          {errorMsg !== "" && <Alert message={errorMsg} type={"error"} />}
          <Space direction="vertical" className="change-password_space">
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Item
                    className="change-password_form-item"
                    label="Current password:"
                    htmlFor="currentPassword"
                  >
                    <Input.Password
                      className="input-text"
                      visibilityToggle
                      {...field}
                      id="currentPassword"
                      placeholder="Current password..."
                    />
                    <p className="change-password_error">
                      {errors.currentPassword?.message}
                    </p>
                  </Form.Item>
                </>
              )}
            />
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Item
                    className="change-password_form-item"
                    label="New password:"
                    htmlFor="newPassword"
                  >
                    <Input.Password
                      visibilityToggle
                      className="input-text"
                      {...field}
                      id="newPassword"
                      placeholder="New password..."
                    />
                    <p className="change-password_error">
                      {errors.newPassword?.message}
                    </p>
                  </Form.Item>
                </>
              )}
            />
            <Controller
              name="confirmNewPassword"
              control={control}
              render={({ field }) => (
                <>
                  <Form.Item
                    className="change-password_form-item"
                    label="Confirm new password:"
                    htmlFor="confirmNewPassword"
                  >
                    <Input.Password
                      visibilityToggle
                      className="input-text"
                      {...field}
                      id="confirmNewPassword"
                      placeholder="Confirm new password..."
                    />
                    <p className="change-password_error">
                      {errors.confirmNewPassword?.message}
                    </p>
                  </Form.Item>
                </>
              )}
            />
          </Space>

          <RedButtonDetailPage
            type="primary"
            htmlType="submit"
            className="change-password_submit-btn"
          >
            Submit
          </RedButtonDetailPage>
        </Space>
      </Form>
    </ChangePasswordWrapper>
  );
}

export default ChangePassword;
