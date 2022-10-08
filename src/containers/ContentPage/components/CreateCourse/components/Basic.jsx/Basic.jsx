import { ExclamationCircleOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Input, Row, Select, Typography } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import { selectAudioLanguage } from "redux/features/audioLanguage/AudioLanguageSelector";
import { selectCategories } from "redux/features/category/CategorySelector";
import { selectCloseCaption } from "redux/features/closeCaption/CloseCaptionSelector";
import { selectBasic } from "redux/features/create-course/CreateCourseSelector";
import { schemaBasic } from "../../validate/schema";
const { Text } = Typography;
const { Option } = Select;
export default function Basic({ handleData, getAllSubmitRef }) {
  const handleSaveBasic = useRef();
  const basicDetail = useSelector(selectBasic);
  const categories = useSelector(selectCategories);
  const audioLanguage = useSelector(selectAudioLanguage);
  const closeCaption = useSelector(selectCloseCaption);
  useEffect(() => {
    getAllSubmitRef({ Basic: handleSaveBasic });
    // eslint-disable-next-line
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaBasic),
    defaultValues: basicDetail,
  });
  const renderCategories = () => {
    if (categories.length > 0) {
      return categories.map((item) => {
        return (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        );
      });
    }
  };
  const renderAudioLanguage = () => {
    if (audioLanguage.length > 0) {
      return audioLanguage.map((item) => {
        return (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        );
      });
    }
  };
  const renderCloseCaption = () => {
    if (closeCaption.length > 0) {
      return closeCaption.map((item) => {
        return (
          <Option value={item.id} key={item.id}>
            {item.name}
          </Option>
        );
      });
    }
  };
  const onSubmit = (data) => {
    handleData(data);
  };
  return (
    <div className="basic-container">
      <div className="basic-header">
        <ExclamationCircleOutlined className="icon-header" />
        <Text className="text-header">Basic Information</Text>
      </div>
      <div className="basic-content">
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
        >
          <Row>
            <Col xs={24} className="pd-input">
              <Form.Item label="Course Title*">
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Input {...field} placeholder="Course title here" />
                      {errors.title && (
                        <p className="error-message">{errors.title?.message}</p>
                      )}
                    </>
                  )}
                />
                <span className="text-hint">
                  (Please make this a maximum of 100 characters and unique.)
                </span>
              </Form.Item>
              <Form.Item label="Short Description*">
                <Controller
                  name="shortDescription"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextArea
                        {...field}
                        showCount
                        placeholder="Item description here..."
                        maxLength={220}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                      />
                      {errors.shortDescription && (
                        <p className="error-message">
                          {errors.shortDescription?.message}
                        </p>
                      )}
                    </>
                  )}
                />
                <span className="text-hint">220 words</span>
              </Form.Item>
              <div
                role="cell"
                className="ant-col ant-col-24 ant-form-item-label"
              >
                <label title="Description*">Description*</label>
              </div>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <>
                    <ReactQuill
                      placeholder="Insert your course description"
                      className="text-editor"
                      {...field}
                    />
                    {errors.description && (
                      <p className="error-message">
                        {errors.description?.message}
                      </p>
                    )}
                  </>
                )}
              />
            </Col>
            <Col
              xs={24}
              md={12}
              className="margin-input pd-input objective-textarea"
            >
              <Form.Item label="What will students learn in your course?*">
                <Controller
                  name="objective"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextArea
                        {...field}
                        placeholder="Enter objective here..."
                        maxLength={220}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                      />
                      <span className="text-hint">
                        Student will gain this skills, knowledge after
                        completing this course. (One per line).
                      </span>
                      {errors.objective && (
                        <p className="error-message">
                          {errors.objective?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="margin-input pd-input">
              <Form.Item label="Requirements*">
                <Controller
                  name="requirements"
                  control={control}
                  render={({ field }) => (
                    <>
                      <TextArea
                        {...field}
                        placeholder="Enter requirements here..."
                        maxLength={220}
                        autoSize={{ minRows: 5, maxRows: 5 }}
                      />
                      <span className="text-hint">
                        What knowledge, technology, tools required by users to
                        start this course. (One per line).
                      </span>
                      {errors.requirements && (
                        <p className="error-message">
                          {errors.requirements?.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="pd-input">
              <Form.Item label="Course level*">
                <Controller
                  name="levelIds"
                  control={control}
                  render={({ field }) => {
                    const props = {
                      ...field,
                    };
                    delete props.value;
                    return (
                      <>
                        <Select
                          {...props}
                          mode="multiple"
                          showArrow
                          placeholder="Please select course level!"
                          defaultValue={basicDetail.levelIds}
                        >
                          <Option value={1}>Beginner</Option>
                          <Option value={2}>Intermediate</Option>
                          <Option value={3}>Expert</Option>
                        </Select>
                        {errors.levelIds && (
                          <p className="error-message">
                            {errors.levelIds?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="pd-input">
              <Form.Item label="Audio Language*">
                <Controller
                  name="audioLanguageIds"
                  control={control}
                  render={({ field }) => {
                    const props = {
                      ...field,
                    };
                    delete props.value;
                    return (
                      <>
                        <Select
                          {...props}
                          mode="multiple"
                          showArrow
                          placeholder="Please select course audio language"
                          defaultValue={basicDetail.audioLanguageIds}
                        >
                          {renderAudioLanguage()}
                        </Select>
                        {errors.audioLanguageIds && (
                          <p className="error-message">
                            {errors.audioLanguageIds?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="pd-input">
              <Form.Item label="Close Caption*">
                <Controller
                  name="closeCaptionIds"
                  control={control}
                  render={({ field }) => {
                    const props = {
                      ...field,
                    };
                    delete props.value;
                    return (
                      <>
                        <Select
                          {...props}
                          mode="multiple"
                          showArrow
                          placeholder="Please select course close caption!"
                          defaultValue={basicDetail.closeCaptionIds}
                        >
                          {renderCloseCaption()}
                        </Select>
                        {errors.closeCaptionIds && (
                          <p className="error-message">
                            {errors.closeCaptionIds?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12} className="pd-input">
              <Form.Item label="Course Category*">
                <Controller
                  name="categoryIds"
                  control={control}
                  render={({ field }) => {
                    const props = {
                      ...field,
                    };
                    delete props.value;
                    return (
                      <>
                        <Select
                          {...props}
                          mode="multiple"
                          showArrow
                          placeholder="Please select course category"
                          defaultValue={basicDetail.categoryIds}
                        >
                          {renderCategories()}
                        </Select>
                        {errors.categoryIds && (
                          <p className="error-message">
                            {errors.categoryIds?.message}
                          </p>
                        )}
                      </>
                    );
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <input type="submit" ref={handleSaveBasic} className="btn-hidden" />
        </Form>
      </div>
    </div>
  );
}
