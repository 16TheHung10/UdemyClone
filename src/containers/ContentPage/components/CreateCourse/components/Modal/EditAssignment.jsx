import { PlusSquareOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { uploadFile } from "apis/features/CreateCourse/CreateCourseAPI";
import { Bin } from "assets/IconComponent";
import { schemaAssignment } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCourseAction } from "redux/features/create-course/CreateCourseSlice";
import { handleFileType } from "./fileTypes";
import "./ModalLecture.css";

const { Option } = Select;
const { Text } = Typography;
export default function EditAssignment({
  id,
  idEdit,
  handleOkEdit,
  contentEdit,
  contents,
}) {
  const [formAssignment] = Form.useForm();
  const dispatch = useDispatch();
  const [fileAttach, setFileAttach] = useState("");
  const [loadingAttach, setLoadingAttach] = useState(false);
  useEffect(() => {
    setFileAttach(contentEdit.attachments);
  }, [contentEdit.attachments]);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaAssignment),
    defaultValues: contentEdit,
  });
  useEffect(() => {
    if (errors.attachments) {
      message.error(errors.attachments?.message);
    }
  }, [errors]);
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
  const onSubmit = (data) => {
    const index = contents.findIndex((item) => {
      return item.title === data.title;
    });
    if (index === -1 || index === idEdit) {
      dispatch(createCourseAction.updateContent({ data, id, idEdit }));
      handleOkEdit();
      setFileAttach("");
      reset();
    } else message.error("Title was exist in this Section");
  };
  return (
    <>
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
                  <p className="error-message">{errors.description?.message}</p>
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
                      return (
                        <>
                          <Select
                            {...field}
                            defaultValue={contentEdit?.durationUnit}
                          >
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
                    <Input {...field} placeholder="Enter Total Number Score" />
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
                    <Input {...field} placeholder="Enter Minimum Pass Number" />

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
                    <Input {...field} placeholder="Enter Maximum size limit" />
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
        <Button htmlType="submit" className="btn-red mg-top">
          Edit Assignment
        </Button>
      </Form>
    </>
  );
}
