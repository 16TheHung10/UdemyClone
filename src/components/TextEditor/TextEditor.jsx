import React from "react";
import { ReactQuill } from "react-quill";

function TextEditor(props) {
  const { value, onChange, placeHolder } = props;
  return (
    <ReactQuill
      value={value || ""}
      onChange={onChange}
      className="account-setting_rich-text"
      placeholder={placeHolder}
    />
  );
}

export default TextEditor;
