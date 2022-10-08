import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";
import PlayerControl from "../PlayerControl/PlayerControl";
import screenfull from "screenfull";
import { findDOMNode } from "react-dom";
import { Row } from "antd";
export default function Video({ selectedLecture, listNote }) {
  //State
  const [controlState, setControlState] = useState({
    playing: false,
    muted: false,
    volume: 1,
    playbackRate: 1,
    fullScreen: false,
    played: 0,
    playedSeconds: 0,
    seeking: false,
  });
  const [visibleControl, setVisibleControl] = useState(true);
  const [visiblePlayButton, setVisiblePlayButton] = useState(true);
  const [visibleSpeedBox, setVisibleChangeSpeedBox] = useState(false);

  //-- End State--
  //Ref
  const playerRef = useRef();
  const visibleRef = useRef();
  const videoGroupRef = useRef();
  const volumeRef = useRef();

  //-- End Ref ---

  const { playing, muted, volume, playbackRate, fullScreen, playedSeconds } =
    controlState;
  const handleProgress = (state) => {
    if (!controlState.seeking) {
      setControlState({ ...controlState, ...state });
    }
  };
  const handlePlayPause = () => {
    setControlState({ ...controlState, playing: !playing });
    setVisiblePlayButton(true);
    setTimeout(() => {
      setVisiblePlayButton(false);
    }, 230);
  };
  const handlePause = () => {
    setControlState({ ...controlState, playing: false });
    setVisibleControl(true);
  };
  const handlePlaying = () => {
    setControlState({ ...controlState, playing: true });
    setVisibleControl(true);
  };
  const seekToNote = (time) => {
    playerRef.current.seekTo(time, "seconds");
    setControlState({ ...controlState, playing: false });
  };
  const handleVisibleSpeedBox = () => {
    setVisibleChangeSpeedBox(false);
  };
  const toggleSpeedBox = () => {
    setVisibleChangeSpeedBox((visibleSpeedBox) => !visibleSpeedBox);
  };
  const onMouseLeave = () => {
    setVisibleControl(false);
    setVisibleChangeSpeedBox(false);
  };
  const onMouseMove = () => {
    setVisibleControl(true);
    if (visibleRef.current) {
      clearTimeout(visibleRef.current);
    }
    visibleRef.current = setTimeout(() => {
      setVisibleControl(false);
      setVisibleChangeSpeedBox(false);
    }, 100500);
  };
  const handleSeekChange = (newValue) => {
    setControlState((controlState) => ({
      ...controlState,
      seeking: true,
      playedSeconds: newValue,
    }));
  };
  const handleSeekMouseDown = () => {
    setControlState((controlState) => ({ ...controlState, seeking: true }));
  };
  const handleSeekMouseUp = (e) => {
    playerRef.current?.seekTo(e, "seconds");
    setControlState({ ...controlState, seeking: false });
  };
  const handleFastForward = () => {
    playerRef.current?.seekTo(
      playerRef.current.getCurrentTime() + 10,
      "seconds"
    );
  };
  const handleRewind = () => {
    playerRef.current?.seekTo(
      playerRef.current.getCurrentTime() - 10,
      "seconds"
    );
  };
  const onPause = () => {
    setControlState({ ...controlState, playing: false });
  };
  const handleMute = () => {
    volumeRef.current = volume;
    setControlState((controlState) => ({
      ...controlState,
      muted: true,
      volume: 0,
    }));
  };
  const handleUnmute = () => {
    setControlState({
      ...controlState,
      muted: false,
      volume: volumeRef.current,
    });
  };
  const handleVolumeChange = (newValue) => {
    setControlState({ ...controlState, volume: newValue / 100 });
    if (newValue === 0) {
      volumeRef.current = 0;
      setControlState((controlState) => ({ ...controlState, muted: true }));
    } else {
      setControlState((controlState) => ({ ...controlState, muted: false }));
    }
  };
  const handleChangePlaybackRate = (valuePlaybackRate) => {
    setControlState((controlState) => ({
      ...controlState,
      playbackRate: valuePlaybackRate,
    }));
  };
  const handleVolumeSeekDown = () => {};
  const handleFullscreen = () => {
    screenfull.toggle(findDOMNode(videoGroupRef?.current));
    screenfull.on("change", () => {
      setControlState((controlState) => ({
        ...controlState,
        fullScreen: !fullScreen,
      }));
    });
  };
  return (
    <Row
      className="download-content"
      ref={videoGroupRef}
      onMouseMove={onMouseMove}
      onClick={onMouseMove}
      onMouseLeave={onMouseLeave}
      onDoubleClick={handleFullscreen}
    >
      {URL && (
        <div className="react-player">
          <ReactPlayer
            ref={playerRef}
            url={selectedLecture.videoUrl}
            muted={muted}
            playing={playing}
            volume={volume}
            playbackRate={playbackRate}
            onProgress={handleProgress}
            width="100%"
            height="100%"
            pip={true}
            config={{ youtube: { playerVars: { disablekb: 1 } } }}
            onPause={handlePause}
            onPlay={handlePlaying}
          />
        </div>
      )}

      <PlayerControl
        visibleControl={visibleControl}
        visibleSpeedBox={visibleSpeedBox}
        isPlaying={playing}
        isMuted={muted}
        isFullscreen={fullScreen}
        volume={volume}
        listNote={listNote.filter(
          (item) => item.title === selectedLecture?.title
        )}
        titleOfLecture={selectedLecture?.title}
        seekToNote={seekToNote}
        played={playedSeconds}
        duration={playerRef.current?.getDuration()}
        selectedLesson={selectedLecture}
        onMouseMove={onMouseMove}
        onSeekingChange={handleSeekChange}
        onSeekingMouseDown={handleSeekMouseDown}
        onSeekingMouseup={handleSeekMouseUp}
        onFastForward={handleFastForward}
        onRewind={handleRewind}
        onPlayPause={handlePlayPause}
        onPause={onPause}
        onMute={handleMute}
        onUnmute={handleUnmute}
        onVolumeChange={handleVolumeChange}
        onVolumeSeekDown={handleVolumeSeekDown}
        onChangePlaybackRate={handleChangePlaybackRate}
        onFullScreen={handleFullscreen}
        handleVisibleSpeedBox={handleVisibleSpeedBox}
        toggleSpeedBox={toggleSpeedBox}
        visiblePlayButton={visiblePlayButton}
      />
    </Row>
  );
}
