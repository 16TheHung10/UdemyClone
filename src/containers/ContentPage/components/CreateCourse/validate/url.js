export const YouTubeGetID = (url) => {
  var ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  } else {
    ID = url;
  }
  return ID;
};
export const getVimeoThumbnail = (url) => {
  let result;
  let request = new XMLHttpRequest();
  request.open("GET", "https://vimeo.com/api/oembed.json?url=" + url, false);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var response = JSON.parse(request.responseText);
      if (response.video_id) {
        result = response.thumbnail_url;
      }
    }
  };
  request.send();
  return result;
};
export const parseVimeoUrl = (url) => {
  const regExp =
    /(?:https?:\/\/(?:www\.)?)?vimeo.com\/(?:channels\/|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
  const match = url.match(regExp);
  return match ? match[3] : false;
};
export function matchYoutubeUrl(url) {
  if (url) {
    const regExp =
      /^(?:https?:)?(?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]{7,15})(?:[\?&][a-zA-Z0-9\_-]+=[a-zA-Z0-9\_-]+)*(?:[&\/\#].*)?$/;
    // /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(\?\S*)?$/;
    if (url.match(regExp)) {
      return true;
    }
  }
  return false;
}

const getExtension = (filename) => {
  var parts = filename.split(".");
  return parts[parts.length - 1];
};

export const isVideo = (filename) => {
  const ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case "m4v":
    case "avi":
    case "mpg":
    case "mp4":
      // etc
      return true;
    default:
      return false;
  }
};
export const toHHMMSS = (secs) => {
  var date = new Date(null);
  date.setSeconds(secs);
  return date.toISOString().substr(11, 8);
};
