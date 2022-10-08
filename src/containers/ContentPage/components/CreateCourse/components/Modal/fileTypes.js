import { Image } from "antd";
import {
  ExcelIcon,
  PdfIcon,
  PowerPointIcon,
  TxtIcon,
  WordIcon,
  ZipIcon,
} from "assets/IconComponent";
export const fileTypes = {
  word: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  excel: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  zip: "application/zip",
  pdf: "application/pdf",
  txt: "text/plain",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
};
export const handleFileType = (file) => {
  const isPNG =
    file.type === "image/png" ||
    file.type === "image/jpeg" ||
    file.type === "image/jpg";
  if (isPNG) {
    return <Image src={file.url} width={"15rem"} height={"5rem"}></Image>;
  }
  if (file.type === fileTypes.word) {
    return <WordIcon className="content-list-icon" />;
  }
  if (file.type === fileTypes.excel) {
    return <ExcelIcon className="content-list-icon" />;
  }
  if (file.type === fileTypes.zip) {
    return <ZipIcon className="content-list-icon" />;
  }
  if (file.type === fileTypes.pdf) {
    return <PdfIcon className="content-list-icon" />;
  }
  if (file.type === fileTypes.pptx) {
    return <PowerPointIcon className="content-list-icon" />;
  }
  if (file.type === fileTypes.txt) {
    return <TxtIcon className="content-list-icon" />;
  }
};
