import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Collapse,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from "antd";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  UnderlineTitle,
  WrapperBilling,
  WrapperContent,
  WrapperPaddingTxt,
} from "./CheckoutStyled";

const { Title, Text } = Typography;
const { Panel } = Collapse;

// Schema yup
const schema = yup
  .object()
  .shape({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "Minimum must be greater 3 characters"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Minimum must be greater 3 characters"),
    academyName: yup.string().required("Academy name is required"),
    country: yup.string().required("Country is required"),
    address1: yup.string().required("Address 1 is required"),
    address2: yup.string().required("Address 2 is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zipPostalCode: yup
      .number("zip/Postal Code must be a number")
      .required("Zip/Postal Code is required"),
    phoneNumber: yup
      .number("Phone Number must be a number")
      .required("Phone number is required"),
  })
  .required();

export default function BillDetail() {
  // UseForm hook
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      academyName: "",
      country: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipPostalCode: "",
      phoneNumber: "",
    },
    resolver: yupResolver(schema),
  });

  // Handle submit form
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <WrapperContent>
      <WrapperBilling>
        <WrapperPaddingTxt>
          <Title level={4}>Billing Details</Title>
          <UnderlineTitle />
        </WrapperPaddingTxt>
        <Collapse
          ghost
          className="collapse-edit"
          expandIcon={({ isActive }) => {
            return isActive ? (
              <MinusOutlined className="icon-checkout" />
            ) : (
              <PlusOutlined className="icon-checkout" />
            );
          }}
          expandIconPosition="end"
        >
          <Panel
            header={
              <>
                <Title level={4} className="edit-addr-txt">
                  Edit Address
                </Title>
              </>
            }
          >
            {/* Form */}
            <Form
              name="basic"
              layout={"vertical"}
              labelCol={{ span: 12 }}
              wrapperCol={{ span: 24 }}
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={handleSubmit(onFinish)}
              onFinishFailed={onFinishFailed}
            >
              <Row className="row-checkout">
                {/* 1 */}
                <Col xs={24} lg={12} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        First Name
                      </span>
                    }
                    validateStatus={errors.firstName ? "error" : ""}
                    help={errors.firstName?.message}
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="First Name" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 2 */}
                <Col xs={24} lg={12} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Last Name
                      </span>
                    }
                    validateStatus={errors.lastName ? "error" : ""}
                    help={errors.lastName?.message}
                  >
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Last Name" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 3 */}
                <Col xs={24} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Academy Name
                      </span>
                    }
                    validateStatus={errors.academyName ? "error" : ""}
                    help={errors.academyName?.message}
                  >
                    <Controller
                      name="academyName"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Academy Name" {...field} />
                      )}
                    />
                    <Text className="academy-text">
                      If you want your invoices addressed to a academy. Leave
                      blank to use your full name.
                    </Text>
                  </Form.Item>
                </Col>

                {/* 4 */}
                <Col xs={24} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Country
                      </span>
                    }
                    validateStatus={errors.country ? "error" : ""}
                    help={errors.country?.message}
                  >
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Select {...field}>
                          <Select.Option value="Vietnam">Vietnam</Select.Option>
                          <Select.Option value="USA">USA</Select.Option>
                          <Select.Option value="English">English</Select.Option>
                        </Select>
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 5 */}
                <Col xs={24} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Address 1
                      </span>
                    }
                    validateStatus={errors.address1 ? "error" : ""}
                    help={errors.address1?.message}
                  >
                    <Controller
                      name="address1"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Address 1" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 6 */}
                <Col xs={24} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Address 2
                      </span>
                    }
                    validateStatus={errors.address2 ? "error" : ""}
                    help={errors.address2?.message}
                  >
                    <Controller
                      name="address2"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Address 2" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 7 */}
                <Col xs={24} lg={12} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        City
                      </span>
                    }
                    validateStatus={errors.city ? "error" : ""}
                    help={errors.city?.message}
                  >
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="City" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 8 */}
                <Col xs={24} lg={12} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        State
                      </span>
                    }
                    validateStatus={errors.state ? "error" : ""}
                    help={errors.state?.message}
                  >
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="State" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 9 */}
                <Col xs={24} lg={12} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Zip/Postal Code
                      </span>
                    }
                    validateStatus={errors.zipPostalCode ? "error" : ""}
                    help={errors.zipPostalCode?.message}
                  >
                    <Controller
                      name="zipPostalCode"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Zip/Postal Code" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>

                {/* 10 */}
                <Col xs={24} lg={12} className="col-checkout">
                  <Form.Item
                    label={
                      <span>
                        <span style={{ color: "red", marginRight: 2 }}>*</span>
                        Phone Number
                      </span>
                    }
                    validateStatus={errors.phoneNumber ? "error" : ""}
                    help={errors.phoneNumber?.message}
                  >
                    <Controller
                      name="phoneNumber"
                      control={control}
                      render={({ field }) => (
                        <Input placeholder="Phone Number" {...field} />
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Button
                    type="primary"
                    danger
                    className="btn-save-change"
                    htmlType="submit"
                  >
                    Save Changes
                  </Button>
                </Col>
              </Row>
            </Form>
            {/* End form */}
          </Panel>
        </Collapse>
        <WrapperPaddingTxt>
          <Text>Joginder Singh</Text>
          <br />
          <Text>#1234 Street No. 45, Ward No. 60, Phase 3,</Text>
          <br />
          <Text>Shahid Karnail Singh Nagar, Near Pakhowal Road.</Text>
          <br />
          <Text>Ludhiana, Punjab, 141013</Text>
          <br />
          <Text>India</Text>
        </WrapperPaddingTxt>
      </WrapperBilling>
    </WrapperContent>
  );
}
