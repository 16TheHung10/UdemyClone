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
  Divider,
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
import { uploadFile } from "apis/features/CreateCourse/CreateCourseAPI";
import { AttachIcon, Bin, CameraIcon, LectureIcon } from "assets/IconComponent";
import { handleFileType } from "containers/ContentPage/components/CreateCourse/components/Modal/fileTypes";
import { schemaLecture } from "containers/ContentPage/components/CreateCourse/validate/schema";
import {
  getVimeoThumbnail,
  isVideo,
  matchYoutubeUrl,
  parseVimeoUrl,
  YouTubeGetID,
} from "containers/ContentPage/components/CreateCourse/validate/url";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useDispatch } from "react-redux";
import { editCourseAction } from "redux/features/edit-course/EditCourseSlice";
import "./ModalLecture.css";
const { Text } = Typography;
const { TabPane } = Tabs;
export default function EditLecture({
  id,
  idEdit,
  handleOkEdit,
  contentEdit,
  contents,
}) {
  const [fileVideo, setFileVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileImg, setFileImg] = useState("");
  const [loadingImg, setLoadingImg] = useState(false);
  const [fileAttach, setFileAttach] = useState("");
  const [loadingAttach, setLoadingAttach] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const [formEditLecture] = Form.useForm();
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
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    clearErrors,
    resetField,
  } = useForm({
    resolver: yupResolver(schemaLecture),
    defaultValues: contentEdit,
  });
  const watchAllFields = watch();
  const propsVideo = {
    beforeUpload: (file) => {
      if (!isVideo(file.name)) {
        message.error(`${file.name} is not a video file`);
        return false;
      } else {
        const localVideoUrl = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "video");
        setLoading(true);
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
  const handleDeleteVideo = () => {
    // const id = getValues("videoId");
    // setLoadingDelete(true);
    // deleteFileAPI(id)
    //   .then((res) => {
    //     message.success(res.data.message);
    //     setLoadingDelete(false);
    //     setFileVideo("");
    //     setValue("videoUrl", "");
    //     setValue("videoId", "");
    //     setValue("localVideoUrl", "");
    //   })
    //   .catch((err) => {
    //     setLoadingDelete(false);
    //     if (err.response.status === 405 || err.response.status === 400) {
    //       message.error("Your File Was Deleted, Please Upload New File");
    //       // dispatch(editCourseAction.deletePreviewVideoMedia());
    //       setValue("previewVideoName", "");
    //       setValue("videoUrl", "");
    //       setValue("videoId", "");
    //       setValue("localVideoUrl", "");
    //       setNotFound(false);
    //     } else message.error(err.message);
    //   });
    message.success("Delete Video Successfully");
    setFileVideo("");
    setValue("previewVideoName", "");
    setValue("videoUrl", "");
    setValue("videoId", "");
    setValue("localVideoUrl", "");
    setValue("totalTime", "");
    setNotFound(false);
  };
  const toHHMMSS = (secs) => {
    var date = new Date(null);
    date.setSeconds(secs);
    return date.toISOString().substr(11, 8);
  };
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
              width="100%"
              height="30rem"
              controls={true}
              ref={youtubeRef}
              onReady={() => {
                setValue("totalTime", youtubeRef.current.getDuration());
              }}
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
    }
    if (getValues("videoType") === "Vimeo URL") {
      if (parseVimeoUrl(getValues("videoUrl"))) {
        setValue("videoPoster", getVimeoThumbnail(getValues("videoUrl")));
      } else message.error("Invalid Vimeo Url");
    }
    formEditLecture.submit();
  };
  const onSubmit = (data) => {
    console.log(data);
    const index = contents.findIndex((item) => {
      return item.title === data.title;
    });
    if (index === -1 || index === idEdit) {
      dispatch(editCourseAction.updateContent({ data, id, idEdit }));
      handleOkEdit();
      setFileVideo("");
      setFileImg("");
      setFileAttach("");
      reset();
    } else message.error("Title was exist in this Section");
  };
  return (
    <>
      {renderDeleteImgModal()}
      {renderDeleteVideoModal()}
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        form={formEditLecture}
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
                render={({ field }) => {
                  return <Switch {...field} checked={field.value} />;
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
              defaultActiveKey={getValues("videoType")}
              onTabClick={(key) => {
                setValue("videoPoster", "");
                setValue("videoUrl", "");
                setValue("videoId", "");
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
                                onReady={() => {
                                  if (parseVimeoUrl(fileVideo.localVideoUrl)) {
                                    videoCapture.current
                                      .getInternalPlayer()
                                      .getDuration()
                                      .then((duration) => {
                                        setValue("totalTime", duration);
                                      })
                                      .catch((error) => {
                                        message.error(
                                          "Can't get video duration"
                                        );
                                      });
                                  } else
                                    setValue(
                                      "totalTime",
                                      videoCapture.current.getDuration()
                                    );
                                }}
                                width="100%"
                                height="15rem"
                                controls={true}
                              ></ReactPlayer>
                            )}
                            <div className="d-flex mg-top">
                              {parseVimeoUrl(fileVideo.localVideoUrl) ? null : (
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
                              )}
                              <Button
                                className="btn-red"
                                onClick={() => {
                                  showModalDeleteVideo();
                                }}
                              >
                                <DeleteOutlined />
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
        <Divider />
        <Button
          onClick={() => {
            handleValidateUrl();
          }}
          className="btn-red mg-top"
        >
          Edit Lecture
        </Button>
      </Form>
    </>
  );
}
