import {
  CameraOutlined,
  DeleteOutlined,
  LoadingOutlined,
  PictureOutlined,
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
  Tabs,
  Typography,
  Upload,
} from "antd";
import {
  deleteFileAPI,
  uploadFile,
} from "apis/features/CreateCourse/CreateCourseAPI";
import { Bin } from "assets/IconComponent";
import { schemaMedia } from "containers/ContentPage/components/CreateCourse/validate/schema";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { selectMedia } from "redux/features/create-course/CreateCourseSelector";
import { createCourseAction } from "redux/features/create-course/CreateCourseSlice";
import {
  getVimeoThumbnail,
  isVideo,
  matchYoutubeUrl,
  parseVimeoUrl,
  YouTubeGetID,
} from "../../validate/url";
import "../Modal/ModalLecture.css";
import Wrapper from "./MediaStyled";
const { TabPane } = Tabs;
const { Text } = Typography;
export default function Media({ getAllSubmitRef, handleData }) {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const media = useSelector(selectMedia);
  const dispatch = useDispatch();
  const [loadingImg, setLoadingImg] = useState(false);
  const handleMediaData = useRef();
  const imgCapture = useRef();
  const videoCapture = useRef();
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
    getAllSubmitRef({ Media: handleMediaData });
    // eslint-disable-next-line
  }, []);
  const [formMedia] = Form.useForm();
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    watch,
    resetField,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaMedia),
    defaultValues: media,
  });
  useEffect(() => {
    if (errors?.previewVideoUrl) {
      message.error(errors.previewVideoUrl?.message);
    }
    if (errors?.imageUrl) {
      message.error(errors.imageUrl?.message);
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
        // const intervalPercent = setInterval(handleInterval, 100);
        uploadFile(formData)
          .then((res) => {
            setLoading(false);
            resetLoading();
            dispatch(
              createCourseAction.addVideoUrl({
                previewVideoUrl: res.data.url,
                previewVideoName: file.name,
                previewVideoId: res.data.id.toString(),
                localVideoUrl: localVideoUrl,
              })
            );
            setValue("previewVideoUrl", res.data.url);
            setValue("previewVideoName", file.name);
            setValue("previewVideoId", res.data.id.toString());
            setValue("localVideoUrl", localVideoUrl);
            message.success("Upload Video Successfully");
          })
          .catch((err) => {
            setLoading(false);
            resetLoading();
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
      const isImage =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";

      if (!isImage) {
        message.error(`${file.name} is not a png file`);
        return false;
      } else {
        setLoadingImg(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image");
        uploadFile(formData)
          .then((res) => {
            message.success("Upload Image Successfully");
            dispatch(createCourseAction.addThumbnailImage(res.data.url));
            setValue("imageUrl", res.data.url);
            setLoadingImg(false);
          })
          .catch((err) => {
            setLoadingImg(false);
            message.error(err.message);
          });
        return false;
      }
    },
    maxCount: 1,
    showUploadList: false,
  };
  const handleDeleteVideo = () => {
    const id = getValues("previewVideoId");
    setLoadingDelete(true);
    deleteFileAPI(id)
      .then((res) => {
        message.success(res.data.message);
        setLoadingDelete(false);
        dispatch(createCourseAction.deletePreviewVideoMedia());
        setValue("previewVideoName", "");
        setValue("previewVideoUrl", "");
        setValue("previewVideoId", "");
        setValue("localVideoUrl", "");
        resetField("previewVideoUrl");
        resetLoading();
      })
      .catch((err) => {
        setLoadingDelete(false);
        message.error(err.message);
      });
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
        message.success("Upload Image Successfully");
        dispatch(createCourseAction.addThumbnailImage(res.data.url));
        setValue("imageUrl", res.data.url);
        setLoadingImg(false);
      })
      .catch((err) => {
        setLoadingImg(false);
        message.error(err.message);
      });
  };

  const onSubmit = (data) => {
    handleData(data);
  };
  const renderReviewVideo = () => {
    if (getValues("previewVideoType") === "Vimeo URL") {
      if (parseVimeoUrl(watchAllFields.previewVideoUrl)) {
        return (
          <div>
            <h3>Preview Video*</h3>
            {getVimeoThumbnail(getValues("previewVideoUrl")) ? (
              <ReactPlayer
                url={getValues("previewVideoUrl")}
                width="100%"
                height="30rem"
                controls={true}
              ></ReactPlayer>
            ) : (
              <Text className="color-primary">Invalid Vimeo Url</Text>
            )}
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
    if (getValues("previewVideoType") === "Youtube URL") {
      if (matchYoutubeUrl(watchAllFields.previewVideoUrl)) {
        return (
          <div>
            <h3>Preview Video*</h3>
            <ReactPlayer
              url={getValues("previewVideoUrl")}
              width="100%"
              height="30rem"
              controls={true}
              onError={(e) => {
                console.log(e);
                ReactPlayer.canPlay(watchAllFields.previewVideoUrl);
                setError("previewVideoUrl", {
                  type: "invalid",
                  message: "Invalid Youtube Url",
                });
              }}
              onReady={() => {
                if (errors.previewVideoUrl) clearErrors("previewVideoUrl");
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
  const renderThumbnail = () => {
    if (getValues("previewVideoType") === "Youtube URL") {
      if (matchYoutubeUrl(watchAllFields.previewVideoUrl)) {
        return (
          <div className="uploaded-container">
            <h3>Course thumbnail*</h3>
            <Image
              src={`https://img.youtube.com/vi/${YouTubeGetID(
                watchAllFields.previewVideoUrl
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
    if (getValues("previewVideoType") === "Vimeo URL") {
      if (parseVimeoUrl(watchAllFields.previewVideoUrl)) {
        return (
          <div className="uploaded-container">
            <h3>Course thumbnail*</h3>
            {getVimeoThumbnail(getValues("previewVideoUrl")) ? (
              <Image
                src={getVimeoThumbnail(watchAllFields.previewVideoUrl)}
                width={"100%"}
                height={"30rem"}
              />
            ) : (
              <Text className="color-primary">Invalid Vimeo Url</Text>
            )}
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
              dispatch(createCourseAction.deleteThumbnailImage());
              setValue("imageUrl", "");
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
    // if (
    //   errors.previewVideoUrl &&
    //   getValues("previewVideoType") !== "HTML5(MP4)"
    // ) {
    //   message.error("Invalid Url");
    //   return;
    // }
    if (
      getValues("previewVideoUrl") === "" &&
      getValues("previewVideoType") !== "HTML5(MP4)"
    ) {
      setValue("imageUrl", "");
    }
    if (getValues("previewVideoType") === "Youtube URL") {
      if (matchYoutubeUrl(getValues("previewVideoUrl"))) {
        setValue(
          "imageUrl",
          `https://img.youtube.com/vi/${YouTubeGetID(
            getValues("previewVideoUrl")
          )}/0.jpg`
        );
      } else message.error("Invalid Youtube Url");
    } else if (getValues("previewVideoType") === "Vimeo URL") {
      if (parseVimeoUrl(getValues("previewVideoUrl"))) {
        setValue("imageUrl", getVimeoThumbnail(getValues("previewVideoUrl")));
      } else message.error("Invalid Vimeo Url");
    }
    formMedia.submit();
  };
  return (
    <div className="basic-container">
      <div className="basic-header">
        <PictureOutlined className="icon-header" />
        <Text className="text-header">Media</Text>
      </div>
      <Wrapper>
        <div>
          {renderDeleteVideoModal()}
          {renderDeleteImgModal()}
          <span>
            Intro Course overview provider type. (.mp4, YouTube, Vimeo etc.)
          </span>
          <div>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              form={formMedia}
              onFinish={handleSubmit(onSubmit)}
            >
              <Tabs
                type="card"
                className="card-video-type"
                defaultActiveKey={getValues("previewVideoType")}
                onTabClick={(key) => {
                  dispatch(createCourseAction.deletePreviewVideoMedia());
                  dispatch(createCourseAction.deleteThumbnailImage());
                  setValue("previewVideoName", "");
                  setValue("previewVideoUrl", "");
                  setValue("previewVideoId", "");
                  setValue("localVideoUrl", "");
                  setValue("imageUrl", "");
                  setValue("previewVideoType", key);
                  clearErrors();
                }}
              >
                <TabPane tab="HTML5(MP4)" key="HTML5(MP4)">
                  <div className="upload-container ">
                    <h3>Upload Preview Video*</h3>
                    <div className="file-container">
                      <div className="d-flex flex-column align-item-center">
                        {media.localVideoUrl ? (
                          <>
                            <ReactPlayer
                              id="videoCapture"
                              ref={videoCapture}
                              url={media.localVideoUrl}
                              width={720}
                              height={300}
                              controls={true}
                            ></ReactPlayer>
                            <div className="d-flex mg-top">
                              <Button
                                className="btn-red  mg-right"
                                onClick={captureThumbnail}
                                disabled={loadingImg}
                              >
                                <CameraOutlined />
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
                          <div className="d-flex flex-column align-item-center">
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
                    </div>
                  </div>
                  <div className="thumbnail-area mg-top">
                    <h3>Course thumbnail*</h3>
                    <div className="file-container">
                      <div className="display-flex flex-column align-item-center">
                        {media.imageUrl ? (
                          <div className="uploaded-container">
                            <Image
                              src={media.imageUrl}
                              width={"auto"}
                              height={"10rem"}
                            />
                            <Bin
                              className="delete-img-button"
                              onClick={() => {
                                showModalDeleteImg();
                              }}
                            />
                          </div>
                        ) : (
                          <div className="display-flex flex-column align-item-center">
                            <Upload {...propsImg}>
                              <Button
                                className="btn-upload-file text-bold"
                                loading={loadingImg}
                              >
                                CHOOSE THUMBNAIL
                              </Button>
                            </Upload>
                            <Text className="text-gray mg-top">
                              Supports: jpg,jpeg, or png
                            </Text>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tab="Youtube" key="Youtube URL">
                  <Form.Item label="Youtube URL*">
                    <Controller
                      name="previewVideoUrl"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Youtube Video URL" />
                      )}
                    />
                  </Form.Item>
                </TabPane>
                <TabPane tab="Vimeo" key="Vimeo URL">
                  <Form.Item label="Vimeo URL*">
                    <Controller
                      name="previewVideoUrl"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder="Vimeo Video URL" />
                      )}
                    />
                  </Form.Item>
                </TabPane>
              </Tabs>
              <Row>
                <Col xs={24} md={12} className="padding-right">
                  {watchAllFields.previewVideoUrl &&
                  getValues("previewVideoType") !== "HTML5(MP4)"
                    ? renderReviewVideo()
                    : null}
                </Col>
                <Col xs={24} md={12} className="padding-right">
                  {watchAllFields.previewVideoUrl &&
                  getValues("previewVideoType") !== "HTML5(MP4)"
                    ? renderThumbnail()
                    : null}
                </Col>
              </Row>
              <canvas
                ref={imgCapture}
                style={{
                  display: "none",
                }}
              ></canvas>
              <Button
                ref={handleMediaData}
                className="btn-hidden"
                onClick={() => {
                  handleValidateUrl();
                }}
              >
                sss
              </Button>
            </Form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
