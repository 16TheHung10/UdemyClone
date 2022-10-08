import { PlusSquareOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { uploadFile } from "apis/features/CreateCourse/CreateCourseAPI";
import { Bin } from "assets/IconComponent";
import { handleFileType } from "containers/ContentPage/components/CreateCourse/components/Modal/fileTypes";
import { schemaAssignment } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { editCourseAction } from "redux/features/edit-course/EditCourseSlice";
import "./ModalLecture.css";

const { Option } = Select;
const { Text } = Typography;
export default function ModalAssignment({ id }) {
  const [formAssignment] = Form.useForm();
  const dispatch = useDispatch();
  const [fileAttach, setFileAttach] = useState("");
  const [loadingAttach, setLoadingAttach] = useState(false);
  const [modalAssignment, setModalAssignment] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaAssignment),
    defaultValues: {
      title: "",
      type: "Assignment",
      description: "",
      durationUnit: 0,
      duration: 0,
      totalNumber: "",
      minimumPassScore: "",
      filesLimit: "",
      maxSizeLimit: 1,
      attachments: [],
    },
  });
  const propsAttach = {
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      setLoadingAttach(true);
      const formData = new FormData();
      formData.append("file", file);
      if (!isPNG) {
        formData.append("type", "docs");
      } else {
        formData.append("type", "image");
      }
      uploadFile(formData)
        .then((res) => {
          message.success(res.data.message);
          setFileAttach([
            ...fileAttach,
            { name: file.name, type: file.type, url: res.data.url },
          ]);
          const temp = getValues("attachments");
          setValue("attachments", [
            ...temp,
            { url: res.data.url, name: file.name, type: file.type },
          ]);
          setLoadingAttach(false);
        })
        .catch((err) => {
          setLoadingAttach(false);
          message.error(err.message);
        });
      return false;
    },
    showUploadList: false,
  };
  const handleDeleteAttachFile = (index) => {
    const newFileList = fileAttach.slice();
    newFileList.splice(index, 1);
    setFileAttach(newFileList);
    message.success("Delete File Successfully");
  };
  const handleDeleteAttachUrl = (index) => {
    const newFileList = getValues("attachments");
    newFileList.splice(index, 1);
    setValue("attachments", newFileList);
  };

  const renderAttachFile = () => {
    if (fileAttach) {
      return fileAttach.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-center align-item-center mg-top"
          >
            {handleFileType(item)}
            <Text className="text-gray mg-left">{item.name}</Text>
            <Bin
              className="lecture-icon-action mg-left"
              onClick={() => {
                handleDeleteAttachFile(index);
                handleDeleteAttachUrl(index);
              }}
            />
          </div>
        );
      });
    }
  };
  const handleCancel = () => {
    setModalAssignment(false);
    clearErrors();
    reset();
  };
  useEffect(() => {
    if (errors.attachments) {
      message.error(errors.attachments?.message);
    }
  }, [errors]);
  const onSubmit = (data) => {
    dispatch(editCourseAction.addContent({ data, id }));
    setModalAssignment(false);
    setFileAttach("");
    reset();
  };
  return (
    <>
      <Button
        ghost
        className="btn-none"
        onClick={() => setModalAssignment(true)}
      >
        <PlusSquareOutlined /> Assignment
      </Button>
      <Modal
        title="Add Assignment"
        visible={modalAssignment}
        className="modal-in-section"
        width={800}
        closable={true}
        destroyOnClose={true}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel} className="btn-cancel">
            Close
          </Button>,
          <Button
            key="submit"
            className="btn-red"
            htmlType="submit"
            onClick={formAssignment.submit}
          >
            Add Assignment
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          form={formAssignment}
          onFinish={handleSubmit(onSubmit)}
        >
          <Form.Item label="Assignment Title*">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <>
                  <Input {...field} placeholder="Title here" />
                  {errors.title && (
                    <p className="error-message">{errors.title?.message}</p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Form.Item label="Description*">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <>
                  <TextArea
                    showCount
                    {...field}
                    placeholder="Description here..."
                    maxLength={220}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                  />
                  {errors.description && (
                    <p className="error-message">
                      {errors.description?.message}
                    </p>
                  )}
                </>
              )}
            />
          </Form.Item>
          <Row>
            <Col md={8}>
              <Row>
                <Col md={16} className="padding-right">
                  <Form.Item label="Time Duration*" className="width-full">
                    <Controller
                      name="duration"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            placeholder="Enter Time Duration"
                            className="width-full"
                          />
                          {errors.duration && (
                            <p className="error-message">
                              {errors.duration?.message}
                            </p>
                          )}
                        </>
                      )}
                    />
                  </Form.Item>
                </Col>
                <Col md={8}>
                  <Form.Item label="Type*">
                    <Controller
                      name="durationUnit"
                      control={control}
                      render={({ field }) => {
                        const props = {
                          ...field,
                        };
                        delete props.value;
                        return (
                          <>
                            <Select {...props} defaultValue={0}>
                              <Option value={0}>Week</Option>
                              <Option value={1}>Day</Option>
                              <Option value={2}>Hour</Option>
                            </Select>
                          </>
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Text className="text-gray">
                Assignment time duration, set 0 for no limit.
              </Text>
            </Col>
            <Col md={8} className="padding-x">
              <Form.Item label="Total Number*">
                <Controller
                  name="totalNumber"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter Total Number Score"
                      />
                      {errors.totalNumber && (
                        <p className="error-message">
                          {errors.totalNumber?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
              <Text className="text-gray">
                Maximum points a student can score
              </Text>
            </Col>
            <Col md={8}>
              <Form.Item label="Minimum Pass Number*">
                <Controller
                  name="minimumPassScore"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter Minimum Pass Number"
                      />

                      {errors.minimumPassScore && (
                        <p className="error-message">
                          {errors.minimumPassScore?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
              <Text className="text-gray">
                Minimum points required for the student to pass this assignment
              </Text>
            </Col>
            <Col md={12} className="padding-right mg-top">
              <Form.Item label="Upload attachment limit*">
                <Controller
                  name="filesLimit"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter Upload attachment limit"
                      />

                      {errors.filesLimit && (
                        <p className="error-message">
                          {errors.filesLimit?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
              <Text className="text-gray">Maximum attachment file limit</Text>
            </Col>
            <Col md={12} className="padding-left mg-top">
              <Form.Item label="Maximum attachment size limit">
                <Controller
                  name="maxSizeLimit"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Enter Maximum size limit"
                      />
                    </>
                  )}
                />
              </Form.Item>
              <Text className="text-gray">
                Define maximum attachment size in MB
              </Text>
            </Col>
            <Col md={24} className="mg-top">
              <div className="file-container mg-top">
                <div className="display-flex flex-column align-item-center">
                  <Upload {...propsAttach}>
                    <Button
                      className="btn-upload-file text-bold"
                      icon={<PlusSquareOutlined />}
                      loading={loadingAttach}
                    >
                      ATTACHMENT
                    </Button>
                  </Upload>
                  {renderAttachFile()}
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
