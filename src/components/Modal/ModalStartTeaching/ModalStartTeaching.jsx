import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input, message as MessageAntd, Modal,
  Row,
  Select,
  Typography
} from "antd";
import { createRequestUpdateRole } from "apis/features/userApi";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "redux/features/auth/AuthSelector";
import { AuthAction } from "redux/features/auth/AuthSlices";
import { selectCategories } from "redux/features/category/CategorySelector";
import AuthUtils from "utils/AuthUtils";
import * as yup from "yup";
import Wrapper from "./ModalStartTeachingStyled";

const { Text } = Typography;
const { Option } = Select;

const schema = yup
  .object({
    categories: yup
      .array()
      .required()
      .length(3)
      .min(3, "You need to choose 3 categories!!!"),
    description: yup
      .string()
      .required("Please Enter some description about you")
      .trim(),
    agreeTerm: yup
      .boolean()
      .required("You need to checked it")
      .oneOf([true], "You need to checked it"),
  })
  .required();

const ModalStartTeaching = ({ visible, setVisible }) => {
  const categories = useSelector(selectCategories);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const userProfile = useSelector(selectUser);
  const {
    control,
    handleSubmit,
    isSubmitting,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categories: [],
      description: "",
      agreeTerm: false,
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await createRequestUpdateRole({
        roleName: "Instructor",
        description: values.description,
        categoryIds: values.categories,
      });

      const { isSuccess, message, data } = response?.data;

      if (!isSuccess) {
        MessageAntd.error(message);
      } else {
        //success
        dispatch(
          AuthAction.updateUser({ ...userProfile, isUpdateRoleRequest: true })
        );
        hideModal();
        MessageAntd.success(
          "Your request is sent. Please wait admin to approve it."
        );
      }
    } catch (error) {
      if (error.response.status === 400) {
        MessageAntd.error(error.response.data.message);
      } else {
        alert(error.message);
      }
    } finally {
      hideModal();
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    reset();
  };

  return (
    <Modal
      onCancel={hideModal}
      title="Start Teaching"
      visible={visible}
      footer={null}
    >
      <Form
        onFinish={handleSubmit(onSubmit)}
        initialValues={{
          layout: {
            wrapperCol: {
              span: 14,
              offset: 4,
            },
          },
        }}
      >
        <Wrapper>
          <Form.Item
            label="Category"
            className="d-flex justify-content-between"
          >
            <Controller
              name="categories"
              style={{ width: "104%" }}
              control={control}
              render={({ field }) => {
                const props = {
                  ...field,
                };
                return (
                  <>
                    <Select
                      {...props}
                      mode="multiple"
                      className="dropdown-scroll"
                      showArrow
                      placeholder="Please select 3 categories"
                    >
                      {categories?.map((item) => (
                        <Option
                          disabled={
                            field.value?.length >= 3
                              ? !field.value?.includes(item?.id)
                              : false
                          }
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                    {errors.categories && (
                      <span className="error-message">
                        {errors.categories?.message}
                      </span>
                    )}
                  </>
                );
              }}
            />
          </Form.Item>
        </Wrapper>

        <Form.Item
          label="Description"
          className="d-flex justify-content-between"
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <Input.TextArea
                  showCount
                  {...field}
                  maxLength={12000}
                  style={{
                    height: 120,
                  }}
                />
                {errors.description && (
                  <span className="error-message">
                    {errors.description?.message}
                  </span>
                )}
              </>
            )}
          />
        </Form.Item>

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
              return (
                <Checkbox {...props} checked={field.value}>
                  I’m agreed with your Term of Use and Privacy Policy
                </Checkbox>
              );
            }}
          />
        </Form.Item>
        <Row className="d-flex justify-content-end">
          <Col className="mg-right">
            <Button
              onClick={hideModal}
              className="btn-secondary btn-outlined"
              block
              htmlType="button"
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              className="btn-red"
              loading={isSubmitting}
              block
              htmlType="submit"
            >
              Send request
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalStartTeaching;
