import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Typography,
  Spin,
} from "antd";
import { useAuthContext } from "hooks/useAuth";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import ThirdLogin from "./ThirdPartyLogin/ThirdPartyLogin";
const { Title } = Typography;

// Schema yup
const schema = yup
  .object()
  .shape({
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
        "Password has at least one uppercase, one number, one special character and minimum 8 in length"
      ),
  })
  .required();

// Component
export default function SignInPage() {
  const { errorsMsg, signIn, isLoading } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    register,
    resetField,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email:
        new URLSearchParams(location.search).get("email")?.toString() ?? "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // handle submit form
  const onFinish = async (values) => {
    await signIn({
      email: values.email.trim(),
      password: values.password.trim(),
    });
    resetField("password");
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <Col span={24} md={8}>
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
          <h2 style={{ color: "#ed2a26", textAlign: "center" }}>
            {new URLSearchParams(location.search).get("name")?.toString()}
          </h2>
          <p 
          style={{ marginBottom: "20px" }}
          className="subHeader">Log In to Your Edututs+ Account!</p>

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

          <Form.Item
            validateStatus={errors.password ? "error" : ""}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
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

          <div className="d-flex justify-content-start">
            <Form.Item className="formItem cursor-pointer color-primary">
              <span onClick={() => navigate("/forgot-pass")}>
                Forgot Password
              </span>
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              className="signInBtn socialBtn"
              loading={isSubmitting}
              block
              htmlType="submit"
            >
              Sign In
            </Button>
          </Form.Item>
          <p style={{ marginTop: "-20px" }} className="text-center">
            Or login with
          </p>
          <ThirdLogin />

          <Divider />

          <Form.Item>
            <p className="signUpAcc">
              {`Don't have an account? `}
              <span onClick={() => navigate("/sign-up")}>Sign Up</span>
            </p>
          </Form.Item>
        </Form>
      </Spin>
    </Col>
  );
}
