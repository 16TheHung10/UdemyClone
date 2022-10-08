import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form, Input, Modal, Typography } from "antd";
import { BookIcon, ListIcon } from "assets/IconComponent";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectSections } from "redux/features/edit-course/EditCourseSelector";
import { editCourseAction } from "redux/features/edit-course/EditCourseSlice";
import * as yup from "yup";
import SectionItem from "../SectionItem/SectionItem";

const { Text } = Typography;

export default function Curriculum() {
  const schema = yup
    .object({
      title: yup.string().required("Please Enter Section Title!"),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      contents: [],
    },
  });
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const sections = useSelector(selectSections);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const renderSections = () => {
    if (sections.length !== 0) {
      return sections.map((item, index) => (
        <SectionItem key={index} data={item} id={index} />
      ));
    }
  };
  const onSubmit = (data) => {
    dispatch(editCourseAction.createSection(data));
    reset();
    handleCancel();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="basic-container">
      <div className="basic-header">
        <div className="flex-item">
          <BookIcon className="icon-size" />
          <Text className="text-header text-size ">Curriculum</Text>
        </div>
      </div>
      <div className="section-create">
        <div className="flex-item">
          <ListIcon className="icon-size" />
          <Text className="text-header text-size ">Curriculum</Text>
        </div>
        <div>
          <Button className="btn-red" onClick={showModal}>
            Add Section
          </Button>
          <Modal
            title="New Section"
            visible={isModalVisible}
            className="modal-in-section"
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel} className="btn-cancel">
                Close
              </Button>,
              <Button
                key="submit"
                className="btn-red"
                htmlType="submit"
                onClick={form.submit}
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              form={form}
              onFinish={handleSubmit(onSubmit)}
            >
              <Form.Item label="Section Name*">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} />
                      {errors.title && (
                        <p className="error-message">{errors.title?.message}</p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
      <div>{renderSections()}</div>
    </div>
  );
}
