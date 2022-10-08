export const formatTime = (seconds) => {
  let h = parseInt(seconds / 3600);
  let min = parseInt((seconds - h * 3600) / 60);
  let s = seconds - min * 60 - h * 3600;

  let secondFormat = s / 10 < 1 ? `0${s}` : `${s}`;
  let minFormat = min / 10 < 1 ? `0${min}` : `${min}`;
  let hoursFormat = h / 10 < 1 ? `0${h}` : `${h}`;

  if (h === 0 && min === 0) {
    return `00:${secondFormat}`;
  } else if (h === 0 && min !== 0) {
    return `${minFormat}:${secondFormat}`;
  } else {
    return `${hoursFormat}:${minFormat}:${secondFormat}`;
  }
};
