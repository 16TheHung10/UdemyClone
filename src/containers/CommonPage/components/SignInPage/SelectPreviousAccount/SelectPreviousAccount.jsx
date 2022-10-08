import { KeyOutlined, MailOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Typography,
} from "antd";
import { login } from "apis/features/CommonAPI/AuthApi";
import { setPreviousLogInUser } from "utils/AuthUtils";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import AuthUtils from "utils/AuthUtils";
import * as yup from "yup";
import ThirdLogin from "./ThirdPartyLogin/ThirdPartyLogin";
import { useDispatch } from "react-redux";
import { LoadingAction } from "redux/features/loading/LoadingSlices";
const { Title } = Typography;

const schema = yup
  .object()
  .shape({
    password: yup.string().trim().required("Password is required"),
  })
  .required();

const SelectPreviousAccount = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // handle submit form
  const onFinish = async (values) => {};

  const onFinishFailed = (errorInfo) => {};
  return (
    <Col lg={8} md={10} sm={12} xs={12}>
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
        <p className="subHeader">Choose your account to continue</p>

        {errorMsg !== "" && <Alert message={errorMsg} type={"error"} />}

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
                onFocus={() => setErrorMsg("")}
                {...field}
              />
            )}
          />
        </Form.Item>

        <div className="d-flex justify-content-between">
          <Form.Item valuePropName="checked" className="formItem">
            <Controller
              name="remember"
              control={control}
              render={({ field }) => {
                const props = {
                  ...field,
                };
                delete props.value;
                return <Checkbox {...props}>Remember me</Checkbox>;
              }}
            />
          </Form.Item>
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
        <Form.Item className="formItem cursor-pointer color-primary">
          <span onClick={() => navigate("/forgot-pass")}>Sign In with another account</span>
        </Form.Item>

        <Divider />

        <Form.Item>
          <p className="signUpAcc">
            {`Don't have an account? `}
            <span onClick={() => navigate("/sign-up")}>Sign Up</span>
          </p>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SelectPreviousAccount;
