import { KeyOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Typography,
  Spin,
} from "antd";
import { useAuthContext } from "hooks/useAuth";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Wrapper from "./SignUpPageStyle";

const { Title } = Typography;

// Schema yup
const schema = yup
  .object()
  .shape({
    fullName: yup
      .string()
      .required("Full name is required")
      .min(3, "Minimum must be greater 3 characters")
      .matches(
        /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
        "Full name has not contains special characters and number"
      ),
    email: yup
      .string()
      .required("Email is required")
      .email("Format must be an e-mail")
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
        "Email must be correct with format abc@exampl.com"
      ),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Minimum must be greater 8 characters")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("You need to confirm password")
      .oneOf(
        [yup.ref("password"), null],
        "Confirm password must be matched with password"
      ),
    agreeTerm: yup
      .boolean()
      .required("You need to checked it")
      .oneOf([true], "You need to checked it"),
    // role: yup.string().required("You need to choose your role"),
    role: yup.string(),
  })
  .required();

export default function SignUpPage() {
  let navigate = useNavigate();
  const { errorsMsg, register: registerHook, isLoading } = useAuthContext();
  const [visible, setVisible] = useState(false);
  const [secondsToGo, setSecondsToGo] = useState(5);
  // UseForm hook
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // Handle submit form
  const onFinish = async (values) => {
    await registerHook(
      {
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
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
      navigate("/");
    }
  }, [secondsToGo]);

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        title="Register Successfully"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
        footer={null}
      >
        <p>Your account has been created.</p>
        <p>
          We just sent to your email an link which contains active account link.{" "}
        </p>
        <p>You need to access into that link to verify your email.</p>
        <p>This page will be redirect to Home Page in {secondsToGo} seconds</p>
      </Modal>
      <Col span={24} md={8}>
        <Wrapper>
          <Spin tip="Loading..." spinning={isLoading}>
            <Form
              className={`formSignUp form-basic ${true && " disabled"}`}
              name="basic"
              onFinish={handleSubmit(onFinish)}
              autoComplete="off"
              layout="vertical"
            >
              <Title className="headerForm" level={3}>
                Welcome to Cursus
              </Title>
              <p className="subHeader">Sign Up and Start Learning!</p>

              {errorsMsg !== "" && <Alert message={errorsMsg} type={"error"} />}

              <Form.Item
                validateStatus={errors.fullName ? "error" : ""}
                help={errors.fullName?.message}
              >
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      prefix={<UserOutlined />}
                      className="formInput"
                      placeholder="Full Name"
                      {...field}
                    />
                  )}
                />
              </Form.Item>

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

              <Form.Item
                validateStatus={errors.password ? "error" : ""}
                help={errors.password?.message}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      prefix={<KeyOutlined />}
                      className="formInput"
                      placeholder="Password"
                      {...field}
                    />
                  )}
                />
              </Form.Item>

              <Form.Item
                validateStatus={errors.confirmPassword ? "error" : ""}
                help={errors.confirmPassword?.message}
              >
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      prefix={<KeyOutlined />}
                      className="formInput"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  )}
                />
              </Form.Item>

              {/* <Form.Item
              validateStatus={errors.role ? "error" : ""}
              help={errors.role?.message}
            >
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select placeholder="Select role" {...field}>
                    <Select.Option value="Student">Student</Select.Option>
                    <Select.Option value="Instructor">Instructor</Select.Option>
                  </Select>
                )}
              />
            </Form.Item> */}

              <Form.Item
                validateStatus={errors.agreeTerm ? "error" : ""}
                help={errors.agreeTerm?.message}
              >
                <Controller
                  name="agreeTerm"
                  control={control}
                  render={({ field }) => {
                    const props = {
                      ...field,
                    };
                    delete props.value;
                    return (
                      <Checkbox {...props}>
                        <span className="subControl">
                          {`I agree to your `}
                          <a className="color-primary" href="/">
                            Terms of Use
                          </a>
                          {` and `}
                          <a className="color-primary" href="/">
                            Privacy Policy
                          </a>
                        </span>
                      </Checkbox>
                    );
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  className="btn-red"
                  loading={isSubmitting}
                  type="primary"
                  block
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </Form.Item>

              {/* <Form.Item className="already-have-account">
              <p className="subControl">
                {`By signing up, you agree to our `}
                <a href="/">Terms of Use</a>
                {` and `}
                <a href="/">Privacy Policy</a>
              </p>
            </Form.Item> */}
              <Divider />

              <Form.Item className="already-have-account">
                <p className="subControl">
                  {`Already have an account ? `}
                  <Link to="/sign-in">Log In</Link>
                </p>
              </Form.Item>
            </Form>
          </Spin>
        </Wrapper>
      </Col>
    </>
  );
}
