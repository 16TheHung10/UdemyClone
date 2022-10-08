import {
  CameraOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Col,
  Form,
  Image,
  Input,
  message,
  Modal,
  Progress,
  Row,
  Switch,
  Tabs,
  TimePicker,
  Typography,
  Upload,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  deleteFileAPI,
  uploadFile,
} from "apis/features/CreateCourse/CreateCourseAPI";
import { AttachIcon, Bin, CameraIcon, LectureIcon } from "assets/IconComponent";
import { schemaLecture } from "containers/ContentPage/components/CreateCourse/validate/schema";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { createCourseAction } from "redux/features/create-course/CreateCourseSlice";
import {
  getVimeoThumbnail,
  isVideo,
  matchYoutubeUrl,
  parseVimeoUrl,
  toHHMMSS,
  YouTubeGetID,
} from "../../validate/url";
import { handleFileType } from "./fileTypes";
import "./ModalLecture.css";
const { Text } = Typography;
const { TabPane } = Tabs;
export default function ModalLecture({ id }) {
  const [fileVideo, setFileVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [fileImg, setFileImg] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [fileAttach, setFileAttach] = useState("");
  const [loadingAttach, setLoadingAttach] = useState(false);
  const dispatch = useDispatch();
  const [formLecture] = Form.useForm();
  const [modalLecture, setModalLecture] = useState(false);
  const imgCapture = useRef();
  const videoCapture = useRef();
  const youtubeRef = useRef();
  const vimeoRef = useRef();
  const [activeKey, setActiveKey] = useState("1");
  const [completed, setCompleted] = useState(0);
  let currentProgress = useRef(0);
  let step = useRef(0.5);
  let [interval, setIntervalId] = useState(null);
  const handleInterval = () => {
    currentProgress.current += step.current;
    setCompleted(
      Math.round(
        (Math.atan(currentProgress.current) / (Math.PI / 2)) * 100 * 1000
      ) / 1000
    );
    if (completed >= 100) {
      clearInterval(interval);
    } else if (completed >= 70) {
      step.current = 0.1;
    }
  };
  const resetLoading = () => {
    clearInterval(interval);
    setCompleted(0);
    currentProgress.current = 0;
    step.current = 0.5;
  };
  useEffect(() => {
    if (loading) {
      setIntervalId(setInterval(handleInterval, 500));
    } else if (!loading) {
      resetLoading();
    }
  }, [loading]);

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    resetField,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schemaLecture),
    defaultValues: {
      type: "Lecture",
      title: "",
      description: "",
      isFreePreview: false,
      videoType: "HTML5(MP4)",
      videoPoster: "",
      totalTime: "",
      attachments: [],
      videoUrl: "",
      videoId: "",
      localVideoUrl: "",
    },
  });
  useEffect(() => {
    if (
      (errors?.title || errors?.description) &&
      !errors?.totalTime &&
      !errors?.videoUrl &&
      !errors?.videoPoster
    ) {
      setActiveKey("1");
    }
    if (
      (errors?.totalTime || errors?.videoUrl || errors?.videoPoster) &&
      !errors?.title &&
      !errors?.description
    ) {
      setActiveKey("2");
    }
    if (
      errors?.title &&
      errors?.description &&
      errors?.totalTime &&
      errors?.videoUrl &&
      errors?.videoPoster
    ) {
      setActiveKey("1");
    }
  }, [errors]);
  const watchAllFields = watch();
  const propsVideo = {
    beforeUpload: (file) => {
      if (!isVideo(file.name)) {
        message.error(`${file.name} is not a video file`);
        return false;
      } else {
        setLoading(true);
        const localVideoUrl = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "video");
        uploadFile(formData)
          .then((res) => {
            setFileVideo({ localVideoUrl: localVideoUrl });
            setLoading(false);
            setValue("videoUrl", res.data.url);
            setValue("videoId", res.data.id.toString());
            setValue("localVideoUrl", localVideoUrl);
            message.success("Upload Video Successfully");
          })
          .catch((err) => {
            setLoading(false);
            message.error(err.message);
          });
        return false;
      }
    },
    maxCount: 1,
    showUploadList: false,
  };
  const propsImg = {
    beforeUpload: (file) => {
      const isPNG =
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg";
      if (!isPNG) {
        message.error(`${file.name} is not a image file`);
        return false;
      } else {
        setLoadingImg(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");
        uploadFile(formData)
          .then((res) => {
            setFileImg({ videoPoster: res.data.url });
            setValue("videoPoster", res.data.url);
            setLoadingImg(false);
            message.success("Upload Image Successfully");
          })
          .catch((err) => {
            setLoadingImg(false);
            message.error(err);
          });
        return false;
      }
    },
    maxCount: 1,
    showUploadList: false,
  };
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
          message.error(err);
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
              ref={vimeoRef}
              onReady={() => {
                vimeoRef.current
                  .getInternalPlayer()
                  .getDuration()
                  .then((duration) => {
                    setValue("totalTime", duration);
                  })
                  .catch((error) => {
                    message.error("Can't get video duration");
                  });
              }}
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
              ref={youtubeRef}
              width="100%"
              height="30rem"
              controls={true}
              onReady={() => {
                setValue("totalTime", youtubeRef.current.getDuration());
              }}
            ></ReactPlayer>
          </div>
        );
      } else {
        return (
          <div className="uploaded-container">
            <h3>Preview Video*</h3>
            <Text className="color-primary">Invalid Youtube Url</Text>
          </div>
        );
      }
    }
  };
  const captureThumbnail = () => {
    const ctx = imgCapture.current.getContext("2d");
    imgCapture.current.width =
      videoCapture.current.wrapper.lastChild.videoWidth;
    imgCapture.current.height =
      videoCapture.current.wrapper.lastChild.videoHeight;
    ctx.drawImage(
      videoCapture.current.wrapper.lastChild,
      0,
      0,
      videoCapture.current.wrapper.lastChild.videoWidth,
      videoCapture.current.wrapper.lastChild.videoHeight
    );
    var dataURL = imgCapture.current.toDataURL();

    var blobBin = atob(dataURL.split(",")[1]);
    var array = [];
    for (var i = 0; i < blobBin.length; i++) {
      array.push(blobBin.charCodeAt(i));
    }
    var file = new Blob([new Uint8Array(array)], {
      type: "image/png",
    });
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "image");
    setLoadingImg(true);
    uploadFile(formData);
    uploadFile(formData)
      .then((res) => {
        setFileImg({ videoPoster: res.data.url });
        setValue("videoPoster", res.data.url);
        setLoadingImg(false);
        message.success("Upload Image Successfully");
      })
      .catch((err) => {
        setLoadingImg(false);
        message.error(err);
      });
  };
  const handleCancel = () => {
    setModalLecture(false);
    setFileVideo("");
    setFileImg("");
    setFileAttach("");
    clearErrors();
    setActiveKey("1");
    reset();
  };
  const handleDeleteVideo = () => {
    const id = getValues("videoId");
    setLoadingDelete(true);
    deleteFileAPI(id)
      .then((res) => {
        message.success(res.data.message);
        setLoadingDelete(false);
        setFileVideo("");
        setValue("videoUrl", "");
        setValue("videoId", "");
        setValue("localVideoUrl", "");
        setValue("totalTime", "");
      })
      .catch((err) => {
        setLoadingDelete(false);
        message.error(err.message);
      });
  };
  const [isDeleteVideo, setIsDeleteVideo] = useState(false);

  const showModalDeleteVideo = () => {
    setIsDeleteVideo(true);
  };

  const handleOkVideo = () => {
    setIsDeleteVideo(false);
  };

  const handleCancelVideo = () => {
    setIsDeleteVideo(false);
  };
  const [isDeleteImg, setIsDeleteImg] = useState(false);

  const showModalDeleteImg = () => {
    setIsDeleteImg(true);
  };

  const handleOkImg = () => {
    setIsDeleteImg(false);
  };

  const handleCancelImg = () => {
    setIsDeleteImg(false);
  };

  const renderDeleteVideoModal = () => {
    return (
      <Modal
        title={`Do you want to delete this Video ?`}
        visible={isDeleteVideo}
        onOk={handleOkVideo}
        onCancel={handleCancelVideo}
        footer={[
          <Button
            key="submit"
            className="btn-red"
            onClick={() => {
              handleDeleteVideo();
              handleOkVideo();
            }}
          >
            Yes
          </Button>,
          <Button key="back" onClick={handleCancelVideo} className="btn-cancel">
            No
          </Button>,
        ]}
      >
        <p>Click Yes to delete this video or click No to cancel</p>
      </Modal>
    );
  };
  const renderDeleteImgModal = () => {
    return (
      <Modal
        title={`Do you want to delete this Thumbnail Image ?`}
        visible={isDeleteImg}
        onOk={handleOkImg}
        onCancel={handleCancelImg}
        footer={[
          <Button
            key="submit"
            className="btn-red"
            onClick={() => {
              setFileImg("");
              setValue("videoPoster", "");
              message.success("Delete Image Successfully");
              handleOkImg();
            }}
          >
            Yes
          </Button>,
          <Button key="back" onClick={handleCancelImg} className="btn-cancel">
            No
          </Button>,
        ]}
      >
        <p>Click Yes to delete this Thumbnail Image or click No to cancel</p>
      </Modal>
    );
  };
  const handleValidateUrl = () => {
    if (
      getValues("videoUrl") === "" &&
      getValues("videoType") !== "HTML5(MP4)"
    ) {
      setValue("videoPoster", "");
    }
    if (getValues("videoType") === "Youtube URL") {
      if (matchYoutubeUrl(getValues("videoUrl"))) {
        setValue(
          "videoPoster",
          `https://img.youtube.com/vi/${YouTubeGetID(
            getValues("videoUrl")
          )}/0.jpg`
        );
      } else message.error("Invalid Youtube Url");
    } else if (getValues("videoType") === "Vimeo URL") {
      if (parseVimeoUrl(getValues("videoUrl"))) {
        setValue("videoPoster", getVimeoThumbnail(getValues("videoUrl")));
      } else message.error("Invalid Vimeo Url");
    }
    formLecture.submit();
  };
  const onSubmit = (data) => {
    dispatch(createCourseAction.addContent({ data, id }));
    setModalLecture(false);
    setFileVideo("");
    setFileImg("");
    setFileAttach("");
    setActiveKey("1");
    reset();
  };
  return (
    <>
      {renderDeleteVideoModal()}
      {renderDeleteImgModal()}
      <Button ghost onClick={() => setModalLecture(true)} className="btn-none">
        <PlusSquareOutlined /> Lecture
      </Button>
      <Modal
        title="Add Lecture"
        visible={modalLecture}
        className="modal-in-section"
        width={800}
        closable={true}
        onCancel={handleCancel}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={handleCancel} className="btn-cancel">
            Close
          </Button>,
          <Button
            key="submit"
            form="form-lecture"
            className="btn-red"
            htmlType="submit"
            onClick={() => {
              handleValidateUrl();
            }}
          >
            Add Lecture
          </Button>,
        ]}
      >
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          form={formLecture}
          onFinish={handleSubmit(onSubmit)}
        >
          <Tabs
            type="card"
            className="tab-payment"
            onTabClick={(key) => {
              setActiveKey(key);
            }}
            activeKey={activeKey}
          >
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
              <Form.Item label="Free Review">
                <Controller
                  name="isFreePreview"
                  control={control}
                  render={({ field }) => (
                    <Switch {...field} checked={field.value} />
                  )}
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
                onTabClick={(key) => {
                  resetField("videoPoster");
                  resetField("videoUrl");
                  resetField("videoId");
                  setFileVideo("");
                  setFileImg("");
                  setValue("videoType", key);
                  setValue("videoPoster", "");
                  setValue("totalTime", "");
                  clearErrors();
                }}
              >
                <TabPane tab="HTML5(MP4)" key="HTML5(MP4)">
                  <Row>
                    <Col
                      xs={24}
                      md={12}
                      className="padding-right padding-y column-file-lecture"
                    >
                      {/* upload file */}
                      <div className="file-container">
                        <div className="display-flex flex-column align-item-center">
                          {fileVideo.localVideoUrl ? (
                            <>
                              <ReactPlayer
                                ref={videoCapture}
                                url={fileVideo.localVideoUrl}
                                width="100%"
                                height={"15rem"}
                                onReady={() => {
                                  setValue(
                                    "totalTime",
                                    videoCapture.current.getDuration()
                                  );
                                }}
                                controls={true}
                              ></ReactPlayer>
                              <div className="d-flex mg-top">
                                <Button
                                  className="btn-red  mg-right"
                                  onClick={captureThumbnail}
                                  disabled={loadingImg}
                                >
                                  {loadingImg ? (
                                    <LoadingOutlined />
                                  ) : (
                                    <CameraOutlined />
                                  )}
                                  Capture Thumbnail
                                </Button>
                                <Button
                                  className="btn-red"
                                  onClick={() => {
                                    showModalDeleteVideo();
                                  }}
                                  disabled={loadingDelete}
                                >
                                  {loadingDelete ? (
                                    <LoadingOutlined />
                                  ) : (
                                    <DeleteOutlined />
                                  )}
                                  Delete Video
                                </Button>
                              </div>
                            </>
                          ) : (
                            <div className="display-flex flex-column align-item-center">
                              <Upload {...propsVideo}>
                                <Button
                                  className="btn-upload-file text-bold"
                                  loading={loading}
                                >
                                  UPLOAD VIDEO
                                </Button>
                              </Upload>
                              <Text className="text-gray mg-top">
                                File Format: .mp4
                              </Text>
                              {loading ? (
                                <Progress
                                  strokeColor={{
                                    "0%": "var(--red-color)",
                                    "100%": "var(--red-color)",
                                  }}
                                  percent={completed}
                                />
                              ) : null}
                            </div>
                          )}
                        </div>
                        <canvas
                          ref={imgCapture}
                          style={{
                            display: "none",
                          }}
                        ></canvas>
                      </div>
                      {errors.videoUrl && (
                        <p className="error-message text-center">
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
                              <div className="uploaded-container">
                                <Image
                                  src={fileImg.videoPoster}
                                  width={"auto"}
                                  height={"15rem"}
                                />
                                <Bin
                                  className="delete-img-button poster-button"
                                  onClick={() => {
                                    showModalDeleteImg();
                                  }}
                                />
                              </div>
                              <Button
                                className="btn-red mg-top"
                                onClick={() => {
                                  showModalDeleteImg();
                                }}
                              >
                                <DeleteOutlined />
                                Delete Image
                              </Button>
                            </>
                          ) : (
                            <div className="display-flex flex-column align-item-center">
                              <Upload {...propsImg}>
                                <Button
                                  className="btn-upload-file text-bold"
                                  loading={loadingImg}
                                >
                                  VIDEO POSTER
                                </Button>
                              </Upload>
                              <Text className="text-gray mg-top">
                                Supports: jpg,jpeg, or png
                              </Text>
                            </div>
                          )}
                        </div>
                      </div>
                      {errors.videoPoster && (
                        <p className="error-message text-center">
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
                          placeholder="Youtube Video URL"
                          onBlur={() => {
                            if (getValues("videoUrl") === "") {
                              setValue("totalTime", "");
                            }
                          }}
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
                          placeholder="Vimeo Video URL"
                          onBlur={() => {
                            if (getValues("videoUrl") === "") {
                              setValue("totalTime", "");
                            }
                          }}
                        />
                      )}
                    />
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Row>
                <Col xs={24} md={12} className="padding-x">
                  {watchAllFields.videoUrl &&
                  getValues("videoType") !== "HTML5(MP4)"
                    ? renderReviewVideo()
                    : null}
                </Col>
                <Col xs={24} md={12} className="padding-x">
                  {watchAllFields.videoUrl &&
                  getValues("videoType") !== "HTML5(MP4)"
                    ? renderThumbnail()
                    : null}
                </Col>
              </Row>
              <Form.Item label="Video Runtime - hh:mm:ss*" className="mg-top">
                <TimePicker
                  showNow={false}
                  disabled
                  value={moment(toHHMMSS(getValues("totalTime")), "HH:mm:ss")}
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
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    </>
  );
}
