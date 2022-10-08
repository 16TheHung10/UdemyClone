import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Input, Row, Select, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { handleFileType } from "containers/ContentPage/components/CreateCourse/components/Modal/fileTypes";
import { schemaAssignment } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import "./ModalLecture.css";
const { Option } = Select;
const { Text } = Typography;
export default function ViewAssignment({
  id,
  idEdit,
  handleOkEdit,
  contentEdit,
  contents,
}) {
  const [formEditAssignment] = Form.useForm();
  const [fileAttach, setFileAttach] = useState("");
  useEffect(() => {
    setFileAttach(contentEdit.attachments);
  }, [contentEdit.attachments]);
  const { control } = useForm({
    resolver: yupResolver(schemaAssignment),
    defaultValues: contentEdit,
  });
  const renderAttachFile = () => {
    if (fileAttach.length > 0) {
      return fileAttach.map((item, index) => {
        return (
          <div
            key={index}
            className="d-flex justify-content-center align-item-center mg-top"
          >
            {handleFileType(item)}
            <Text className="text-gray mg-left">{item.name}</Text>
          </div>
        );
      });
    } else {
      return (
        <div className="d-flex justify-content-center align-item-center mg-top">
          <Text className="text-gray mg-left">Empty</Text>
        </div>
      );
    }
  };
  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        form={formEditAssignment}
      >
        <Form.Item label="Assignment Title*">
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} readOnly placeholder="Title here" />
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
                  readOnly
                  placeholder="Description here..."
                  maxLength={220}
                  autoSize={{ minRows: 5, maxRows: 5 }}
                />
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
                          readOnly
                          placeholder="Enter Time Duration"
                          className="width-full"
                        />
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
                      <>
                        <Select {...field} disabled defaultValue={0}>
                          <Option value={0}>Week</Option>
                          <Option value={1}>Day</Option>
                          <Option value={2}>Hour</Option>
                        </Select>
                      </>;
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
                      readOnly
                      placeholder="Enter Total Number Score"
                    />
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
                      readOnly
                      placeholder="Enter Minimum Pass Number"
                    />
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
                      readOnly
                      placeholder="Enter Upload attachment limit"
                    />
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
                      readOnly
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
                {renderAttachFile()}
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}
