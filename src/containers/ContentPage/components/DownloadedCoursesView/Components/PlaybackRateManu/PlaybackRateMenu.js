import React from "react";
import { PlaybackRateMenuWraper } from "./PlaybackRateMenuStyled";
const dataMenu = [
  { title: "0.25", value: 0.25 },
  { title: "0.5", value: 0.5 },
  { title: "0.75", value: 0.75 },
  { title: "1", value: 1 },
  { title: "1.25", value: 1.25 },
  { title: "1.5", value: 1.5 },
  { title: "1.75", value: 1.75 },
  { title: "2", value: 2 },
];
export default function PlaybackRateMenu({ setPlaybackRate, hide }) {
  const selectedValue = (value) => {
    setPlaybackRate(value);
    hide(false);
  };
  return (
    <PlaybackRateMenuWraper>
      {dataMenu.map((item, index) => {
        return (
          <div
            onClick={() => {
              selectedValue(item.value);
            }}
            key={`playbackMenu-${index}`}
            className="playback-item"
          >
            {item.title}
          </div>
        );
      })}
    </PlaybackRateMenuWraper>
  );
}
