import { PictureOutlined } from "@ant-design/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Form, Image, Input, message, Row, Tabs, Typography } from "antd";
import { Bin } from "assets/IconComponent";
import { schemaMedia } from "containers/ContentPage/components/CreateCourse/validate/schema";
import {
  getVimeoThumbnail,
  matchYoutubeUrl,
  parseVimeoUrl,
  YouTubeGetID,
} from "containers/ContentPage/components/CreateCourse/validate/url";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPlayer from "react-player";
import "../Modal/ModalLecture.css";
import Wrapper from "./MediaStyled";
const { TabPane } = Tabs;
const { Text } = Typography;
export default function Media({ media }) {
  const [notFound, setNotFound] = useState(false);
  const imgCapture = useRef();
  const videoCapture = useRef();

  const [formMedia] = Form.useForm();

  const { control, getValues, watch } = useForm({
    resolver: yupResolver(schemaMedia),
    defaultValues: media,
  });
  const watchAllFields = watch();
  const renderReviewVideo = () => {
    if (getValues("previewVideoType") === "Vimeo URL") {
      if (parseVimeoUrl(watchAllFields.previewVideoUrl)) {
        return (
          <div>
            <h3>Preview Video*</h3>
            <ReactPlayer
              url={getValues("previewVideoUrl")}
              width="100%"
              height="30rem"
              controls={true}
            ></ReactPlayer>{" "}
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
            <Image
              src={getVimeoThumbnail(watchAllFields.previewVideoUrl)}
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

  return (
    <div className="basic-container">
      <div className="basic-header">
        <PictureOutlined className="icon-header" />
        <Text className="text-header">Media</Text>
      </div>
      <Wrapper>
        <div>
          <span>
            Intro Course overview provider type. (.mp4, YouTube, Vimeo etc.)
          </span>
          <div>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              layout="vertical"
              form={formMedia}
            >
              <Tabs
                type="card"
                className="card-video-type"
                activeKey={getValues("previewVideoType")}
              >
                <TabPane tab="HTML5(MP4)" key="HTML5(MP4)">
                  <div className="upload-container">
                    <h3>Upload Preview Video*</h3>
                    <div className="file-container">
                      <div className="d-flex flex-column align-item-center file-item">
                        {media.localVideoUrl ? (
                          <>
                            {notFound ? (
                              <div className="failed-load-video d-flex justify-content-center align-item-center">
                                <Text className="text-white">
                                  Video Not Found
                                </Text>
                              </div>
                            ) : (
                              <ReactPlayer
                                id="videoCapture"
                                ref={videoCapture}
                                url={media.localVideoUrl}
                                onError={(e) => {
                                  message.error(e.message);
                                  setNotFound(true);
                                }}
                                width={"100%"}
                                height={300}
                                controls={true}
                              ></ReactPlayer>
                            )}
                          </>
                        ) : (
                          <div className="d-flex flex-column align-item-center">
                            Video Not Found
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
                              onClick={() => {}}
                            />
                          </div>
                        ) : (
                          <div className="display-flex flex-column align-item-center">
                            Video Not Found
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
                      name="previewVideoUrl"
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
            </Form>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
