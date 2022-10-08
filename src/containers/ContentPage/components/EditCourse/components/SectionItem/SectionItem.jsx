import { SaveOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Collapse,
  Form,
  Input,
  Modal,
  Tooltip,
  Typography,
} from "antd";
import { Bar, Bin, EditIcon } from "assets/IconComponent";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editCourseAction } from "redux/features/edit-course/EditCourseSlice";
import * as yup from "yup";
import ContentList from "../ContentList/ContentList";
import ModalAssignment from "../Modal/ModalAssignment";
import ModalLecture from "../Modal/ModalLecture";
import ModalQuiz from "../Modal/ModalQuiz";
const { Text } = Typography;
const { Panel } = Collapse;
export default function SectionItem({ data, id }) {
  const dispatch = useDispatch();
  const schema = yup
    .object({
      title: yup.string().required("Please Enter Section Title!"),
    })
    .required();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [form] = Form.useForm();
  const [open, setOpen] = useState([]);
  const handleCollapse = (e) => {
    e.preventDefault();
    if (open.length !== 0) {
      setOpen([]);
    } else setOpen([1]);
  };
  const [isDeleteSection, setIsDeleteSection] = useState(false);

  const showModalSection = () => {
    setIsDeleteSection(true);
  };

  const handleOkSection = () => {
    setIsDeleteSection(false);
  };

  const handleCancelSection = () => {
    setIsDeleteSection(false);
  };

  return (
    <div className="section-item">
      <Modal
        title={`Do you want to delete this section ${id + 1}?`}
        visible={isDeleteSection}
        onOk={handleOkSection}
        onCancel={handleCancelSection}
        footer={[
          <Button
            key="submit"
            className="btn-red"
            htmlType="submit"
            onClick={() => {
              dispatch(editCourseAction.deleteSection(id));
              handleOkSection();
            }}
          >
            Yes
          </Button>,
          <Button
            key="back"
            onClick={handleCancelSection}
            className="btn-cancel"
          >
            No
          </Button>,
        ]}
      >
        <p>Click Yes to delete this section or click No to cancel</p>
      </Modal>
      <div className="section-header">
        <Collapse activeKey={open} ghost>
          <Panel
            showArrow={false}
            header={
              <div className="display-flex width-full justify-content-between">
                <div className="display-flex align-item-center">
                  <Bar className="icon-size-mini" />
                  <Text className="text-bold">{data.title}</Text>
                </div>
                <div>
                  <Tooltip placement="top" title={"Edit Section"}>
                    <EditIcon
                      onClick={handleCollapse}
                      className="icon-size-mini icon-hover"
                    />
                  </Tooltip>
                  <Tooltip placement="top" title={"Delete Section"}>
                    <Bin
                      onClick={showModalSection}
                      className="icon-size-mini icon-hover"
                    />
                  </Tooltip>
                </div>
              </div>
            }
            key="1"
          >
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              form={form}
              onFinish={handleSubmit((data) => {
                dispatch(editCourseAction.updateSection({ data, id }));
                setOpen([]);
              })}
            >
              <Form.Item label="Section Name*">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input defaultValue={data.title} {...field} />
                      {errors.title && (
                        <p className="error-message">{errors.title?.message}</p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
              <Button key="submit" className="btn-red" onClick={form.submit}>
                <SaveOutlined /> Update Section
              </Button>
            </Form>
          </Panel>
        </Collapse>
      </div>
      <div className="section-content">
        <ContentList id={id} />
      </div>
      <div className="section-footer">
        <ModalLecture id={id} />
        <ModalQuiz id={id} />
        <ModalAssignment id={id} />
      </div>
    </div>
  );
}
