import { yupResolver } from "@hookform/resolvers/yup";
import {
  Col,
  Form,
  Image,
  Input,
  message,
  Row,
  Switch,
  Tabs,
  TimePicker,
  Typography,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { AttachIcon, CameraIcon, LectureIcon } from "assets/IconComponent";
import { handleFileType } from "containers/ContentPage/components/CreateCourse/components/Modal/fileTypes";
import { schemaLecture } from "containers/ContentPage/components/CreateCourse/validate/schema";
import {
  getVimeoThumbnail,
  matchYoutubeUrl,
  parseVimeoUrl,
  YouTubeGetID,
} from "containers/ContentPage/components/CreateCourse/validate/url";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import "./ModalLecture.css";
const { Text } = Typography;
const { TabPane } = Tabs;
export default function ViewLecture({
  id,
  idEdit,
  handleOkEdit,
  contentEdit,
  contents,
}) {
  const [fileVideo, setFileVideo] = useState("");
  const [fileImg, setFileImg] = useState("");
  const [fileAttach, setFileAttach] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [formEditLecture] = Form.useForm();
  const videoCapture = useRef();
  useEffect(() => {
    setFileAttach(contentEdit.attachments);
    if (contentEdit.videoType === "HTML5(MP4)" && contentEdit.localVideoUrl) {
      setFileVideo({ localVideoUrl: contentEdit.localVideoUrl });
      setFileImg({ videoPoster: contentEdit.videoPoster });
    } else {
      setFileVideo({ localVideoUrl: contentEdit.videoUrl });
      setFileImg({ videoPoster: contentEdit.videoPoster });
    }
  }, []);

  const {
    control,
    setValue,
    formState: { errors },
    getValues,
    watch,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaLecture),
    defaultValues: contentEdit,
  });
  const watchAllFields = watch();
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
  const handleTotalTime = (time) => {
    if (time) {
      const totalTime =
        time._d.getSeconds() +
        time._d.getMinutes() * 60 +
        time._d.getHours() * 3600;
      setValue("totalTime", totalTime);
      clearErrors("totalTime");
    } else setValue("totalTime", 0);
  };
  const toHHMMSS = (secs) => {
    var date = new Date(null);
    date.setSeconds(secs);
    return date.toISOString().substr(11, 8);
  };
  const renderThumbnail = () => {
    if (getValues("videoType") === "Youtube URL") {
      if (matchYoutubeUrl(watchAllFields.videoUrl)) {
        return (
          <div className="uploaded-container">
            <h3>Course thumbnail*</h3>
            <Image
              src={`https://img.youtube.com/vi/${YouTubeGetID(
                watchAllFields.videoUrl
              )}/0.jpg`}
              width={"100%"}
              height={"30rem"}
            />
          </div>
        );
      } else
        return (
          <div className="uploaded-container">
            <h3>Course thumbnail*</h3>
            <Text className="color-primary">Invalid Youtube Url</Text>
          </div>
        );
    }
    if (getValues("videoType") === "Vimeo URL") {
      if (parseVimeoUrl(watchAllFields.videoUrl)) {
        return (
          <div className="uploaded-container">
            <h3>Course thumbnail*</h3>
            <Image
              src={getVimeoThumbnail(watchAllFields.videoUrl)}
              width={"100%"}
              height={"30rem"}
            />
          </div>
        );
      } else
        return (
          <div className="uploaded-container">
            <h3>Course thumbnail*</h3>
            <Text className="color-primary">Invalid Vimeo Url</Text>
          </div>
        );
    }
  };
  const renderReviewVideo = () => {
    if (getValues("videoType") === "Vimeo URL") {
      if (parseVimeoUrl(watchAllFields.videoUrl)) {
        return (
          <div>
            <h3>Preview Video*</h3>
            <ReactPlayer
              url={getValues("videoUrl")}
              width="100%"
              height="30rem"
              controls={true}
            ></ReactPlayer>
          </div>
        );
      } else
        return (
          <div className="uploaded-container">
            <h3>Preview Video*</h3>
            <Text className="color-primary">Invalid Vimeo Url</Text>
          </div>
        );
    }
    if (getValues("videoType") === "Youtube URL") {
      if (matchYoutubeUrl(watchAllFields.videoUrl)) {
        return (
          <div>
            <h3>Preview Video*</h3>
            <ReactPlayer
              url={getValues("videoUrl")}
              width="100%"
              height="30rem"
              controls={true}
            ></ReactPlayer>
          </div>
        );
      } else
        return (
          <div className="uploaded-container">
            <h3>Preview Video*</h3>
            <Text className="color-primary">Invalid Youtube Url</Text>
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
        form={formEditLecture}
      >
        <Tabs type="card" className="tab-payment">
          <TabPane
            tab={
              <>
                <LectureIcon className="lecture-icon" />
                <Text>Basic*</Text>
              </>
            }
            key="1"
          >
            <Form.Item label="Lecture Title*">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <>
                    <Input {...field} readOnly placeholder="Title here" />
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
                      readOnly
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
            <Form.Item label="Free Review">
              <Controller
                name="isFreePreview"
                control={control}
                render={({ field }) => {
                  return <Switch {...field} disabled checked={field.value} />;
                }}
              />
            </Form.Item>
          </TabPane>
          <TabPane
            tab={
              <>
                <CameraIcon className="lecture-icon" />
                <Text>Video*</Text>
              </>
            }
            key="2"
          >
            <Text className="text-gray">
              Select your preferred video type. (.mp4, YouTube, Vimeo etc.)
            </Text>
            <Tabs
              type="card"
              className="card-video-type"
              activeKey={getValues("videoType")}
            >
              <TabPane tab="HTML5(MP4)" key="HTML5(MP4)">
                <Row>
                  <Col
                    xs={24}
                    md={12}
                    className="padding-left padding-y column-file-lecture"
                  >
                    {/* upload file */}
                    <div className="file-container">
                      <div className="display-flex flex-column align-item-center file-item">
                        {fileVideo.localVideoUrl ? (
                          <>
                            {notFound ? (
                              <div className="failed-load-video d-flex justify-content-center align-item-center">
                                <Text className="text-white">
                                  Video Not Found
                                </Text>
                              </div>
                            ) : (
                              <ReactPlayer
                                ref={videoCapture}
                                url={fileVideo.localVideoUrl}
                                onError={(e) => {
                                  message.error(e.message);
                                  setNotFound(true);
                                }}
                                width="100%"
                                height="15rem"
                                controls={true}
                              ></ReactPlayer>
                            )}
                          </>
                        ) : (
                          <div className="display-flex flex-column align-item-center">
                            Video Not Found
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.videoUrl && (
                      <p className="error-message">
                        {errors.videoUrl?.message}
                      </p>
                    )}
                  </Col>
                  <Col
                    xs={24}
                    md={12}
                    className="padding-left padding-y column-file-lecture"
                  >
                    <div className="file-container">
                      <div className="display-flex flex-column align-item-center">
                        {fileImg.videoPoster ? (
                          <>
                            <div className="uploaded-container d-flex">
                              <Image
                                src={fileImg.videoPoster}
                                width={"auto"}
                                height={"15rem"}
                              />
                            </div>
                          </>
                        ) : (
                          <div className="display-flex flex-column align-item-center">
                            Img not Found
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.videoPoster && (
                      <p className="error-message">
                        {errors.videoPoster?.message}
                      </p>
                    )}
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Youtube" key="Youtube URL">
                <Form.Item label="Youtube URL*">
                  <Controller
                    name="videoUrl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        readOnly
                        placeholder="Youtube Video URL"
                      />
                    )}
                  />
                </Form.Item>
              </TabPane>
              <TabPane tab="Vimeo" key="Vimeo URL">
                <Form.Item label="Vimeo URL*">
                  <Controller
                    name="videoUrl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        readOnly
                        placeholder="Vimeo Video URL"
                      />
                    )}
                  />
                </Form.Item>
              </TabPane>
            </Tabs>
            <Row>
              <Col xs={24} md={12} className="padding-right">
                {watchAllFields.videoUrl &&
                getValues("videoType") !== "HTML5(MP4)"
                  ? renderReviewVideo()
                  : null}
              </Col>
              <Col xs={24} md={12} className="padding-left">
                {watchAllFields.videoUrl &&
                getValues("videoType") !== "HTML5(MP4)"
                  ? renderThumbnail()
                  : null}
              </Col>
            </Row>
            <Form.Item label="Video Runtime - hh:mm:ss*" className="mg-top">
              <TimePicker
                defaultValue={moment(
                  toHHMMSS(contentEdit.totalTime),
                  "HH:mm:ss"
                )}
                disabled
                onChange={handleTotalTime}
              />
              {errors.totalTime && (
                <p className="error-message">{errors.totalTime?.message}</p>
              )}
            </Form.Item>
          </TabPane>
          <TabPane
            tab={
              <>
                <AttachIcon className="lecture-icon" />
                <Text>Attachments</Text>
              </>
            }
            key="3"
          >
            <div className="file-container mg-top">
              <div className="display-flex flex-column align-item-center">
                {renderAttachFile()}
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Form>
    </>
  );
}
