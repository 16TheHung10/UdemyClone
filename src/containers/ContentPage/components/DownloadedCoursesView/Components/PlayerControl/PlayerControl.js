import { PlayerControlWraper } from "./PlayerControlWraper";
import { saveAs } from "file-saver";
import {
  Button,
  Slider,
  Tooltip,
  Typography,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import { ReactComponent as Backward } from "assets/svg/backward.svg";
import { ReactComponent as Enlarge } from "assets/svg/enlarge.svg";
import { ReactComponent as Forward } from "assets/svg/forward.svg";
import { ReactComponent as Pause } from "assets/svg/pause.svg";
import { ReactComponent as Play } from "assets/svg/play.svg";
import { ReactComponent as Shrink } from "assets/svg/shrink.svg";
import { ReactComponent as Volume } from "assets/svg/volume-high.svg";
import { ReactComponent as VolumeMute } from "assets/svg/volume-mute.svg";
import React, { useState } from "react";
import { DownloadOutlined, FlagOutlined } from "@ant-design/icons";
import { formatTime } from "utils/TimeUtil";
import { useParams } from "react-router-dom";
import { postMyReport } from "apis/features/Report/ReportApi";
import { postNotification } from "apis/features/Notification/Notification";
import { selectUser } from "redux/features/auth/AuthSelector";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;
export default function PlayerControl({
  onPlayPause,
  visibleControl,
  visiblePlayButton,
  isPlaying,
  onRewind,
  onFastForward,
  isMuted,
  onMute,
  onVolumeChange,
  onChangePlaybackRate,
  onFullScreen,
  volume,
  onUnmute,
  isFullscreen,
  played,
  duration,
  onSeekingChange,
  onSeekingMouseDown,
  selectedLesson,
  onSeekingMouseup,
  onMouseMove,
  listNote,
  seekToNote,
  onPause,
  titleOfLecture,
  visibleSpeedBox,
  handleVisibleSpeedBox,
  toggleSpeedBox,
}) {
  const { id } = useParams();
  const [selectedSpeed, setSelectedSpeed] = useState(1);
  const userProfile = useSelector(selectUser);
  const speedValue = [0.25, 0.5, 1, 1.25, 1.5, 1.75, 2];

  const SVGStyle = {
    width: "20%",
    height: "20%",
    fill: "white",
  };
  const handleChangeSpeed = (value) => {
    setSelectedSpeed(value);
    handleVisibleSpeedBox();
    onChangePlaybackRate(value);
  };

  const renderPlayPauseButton = () => {
    if (isPlaying)
      return (
        <Pause
          {...SVGStyle}
          onClick={onPlayPause}
          className="bottom-control-icon"
        />
      );
    return (
      <Play
        {...SVGStyle}
        onClick={onPlayPause}
        className="bottom-control-icon"
      />
    );
  };
  const renderMutedUnmuted = () => {
    if (isMuted)
      return (
        <VolumeMute
          {...SVGStyle}
          onClick={onUnmute}
          className="bottom-control-icon"
        />
      );
    return (
      <Volume {...SVGStyle} onClick={onMute} className="bottom-control-icon" />
    );
  };
  const renderFullScreenOrNot = () => {
    if (isFullscreen)
      return (
        <Shrink
          width="3rem"
          height="3rem"
          fill="white"
          onClick={onFullScreen}
          className="bottom-control-icon"
        />
      );
    return (
      <Enlarge
        width="3rem"
        height="3rem"
        fill="white"
        onClick={onFullScreen}
        className="bottom-control-icon"
      />
    );
  };
  const formatter = (value) => `${value}`;

  // handle report course
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const response = await postMyReport({
      type: 0,
      courseId: id,
      description: values.reportContent,
    });

    if (response?.data?.isSuccess) {
      message.success("Report successfully");
      // Gưi noti cho admin
      postNotification({
        userIds: ["4df92cd9-1fa5-4c4c-5ab7-08da439dd00d"],
        type: 0,
        content: `you have a new report from ${userProfile.fullName}`,
      });
      // End noti
      form.resetFields();
      setIsModalVisible(false);
    } else {
      message.error("Report fail");
      setIsModalVisible(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // ---End handle report course---
  return (
    <PlayerControlWraper>
      {/* top control */}
      <section className={`top-control ${!visibleControl && "hideTopControl"}`}>
        <Title level={2} className="title">
          {titleOfLecture || "No title"}
        </Title>
      </section>
      {/* middle control */}
      <section className="middle-control">
        {/* <div onDoubleClick={onRewind} className="backward middle-control-item">
          <Backward {...SVGStyle} className="middle-control-item-icon" />
        </div> */}

        <div
          onClick={onPlayPause}
          className={`backward middle-control-item ${
            !visiblePlayButton && "opacity-0"
          }`}
        >
          {isPlaying ? (
            <Pause
              width="50%"
              height="50%"
              fill="white"
              className="middle-control-item-icon"
            />
          ) : (
            <Play
              width="50%"
              height="50%"
              fill="white"
              className="middle-control-item-icon"
            />
          )}
        </div>

        {/* <div
          onDoubleClick={onFastForward}
          className="forward middle-control-item"
        >
          <Forward {...SVGStyle} className="middle-control-item-icon" />
        </div> */}
      </section>
      {/* bottom control */}
      <section
        className={`bottom-control ${!visibleControl && "hideBottomControl"}`}
      >
        <div className="slider">
          <Slider
            min={0}
            max={duration}
            value={played}
            tipFormatter={formatter}
            onChange={onSeekingChange}
            onAfterChange={onSeekingMouseup}
          />
          {listNote.map((note, index) => {
            return (
              <Tooltip key={`tooltip-${index}`} title="You took note here">
                <button
                  className="note-item"
                  onClick={() => {
                    seekToNote(note.time);
                    onPause();
                  }}
                  style={{
                    left: `${(note.time / parseInt(duration)) * 100}%`,
                  }}
                ></button>
              </Tooltip>
            );
          })}
        </div>
        <div className="control-group">
          <div className="bottom-control-left">
            {renderPlayPauseButton()}
            <Backward
              onClick={onRewind}
              {...SVGStyle}
              className="bottom-control-icon"
            />
            <Forward
              onClick={onFastForward}
              {...SVGStyle}
              className="bottom-control-icon"
            />
            {renderMutedUnmuted()}
            <Slider
              min={0}
              max={100}
              // defaultValue={volume * 100}
              value={volume * 100}
              tipFormatter={formatter}
              onChange={onVolumeChange}
            />
            {visibleSpeedBox && (
              <div className="change-speed-box">
                {speedValue.map((item, index) => {
                  return (
                    <button
                      key={`change-speed-btn-${index}`}
                      onClick={() => {
                        handleChangeSpeed(item);
                      }}
                      className="change-speed-box-btn"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            )}
            <Button
              onClick={toggleSpeedBox}
              className="speed-btn"
            >{`${selectedSpeed}X`}</Button>

            {/* <p className="time">
              {`${formatTime(parseInt(played))} : ${formatTime(
                parseInt(duration)
              )}`}
            </p> */}
            <div className="time">
              <span>{formatTime(parseInt(played))}</span>
              <span>/</span>
              <span>{formatTime(parseInt(duration))}</span>
            </div>
          </div>
          <div className="bottom-control-right">
            {/* <Tooltip placement="topLeft" title="Download">
              <Button
                onClick={() => {
                  selectedLesson.videoUrl &&
                    saveAs(
                      "https://www.youtube.com/watch?v=ictgUeERs7M",
                      `ol.mp4`
                    );
                }}
                className="download-btn"
              >
                <DownloadOutlined />
              </Button>
            </Tooltip> */}

            <Tooltip placement="topLeft" title="Report course">
              <Button
                onClick={() => {
                  setIsModalVisible(true);
                }}
                className="download-btn"
              >
                <FlagOutlined />
              </Button>
            </Tooltip>
            {renderFullScreenOrNot()}
          </div>
        </div>
      </section>

      <Modal
        title={
          <h2>
            <FlagOutlined style={{ marginRight: 8 }} />
            Report course
          </h2>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <h4>Write your report about this course</h4>
        <Form
          form={form}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="reportContent"
            rules={[
              {
                required: true,
                message: "Please input your report!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Submit
            </Button>
            <Button type="primary" onClick={handleCancel} danger>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PlayerControlWraper>
  );
}
