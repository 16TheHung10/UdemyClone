import React from "react";
import { Typography } from "antd";
import { NoteItemStyled } from "./NoteItemStyled";
const { Text } = Typography;
export default function NoteItem({ note }) {
  const { time, value, title } = note;
  console.log("title");
  return (
    <NoteItemStyled>
      <div className="header">
        <p>Time: {time}</p>
        <p className="header-title">{title}</p>
      </div>
      <div className="content">{value}</div>
    </NoteItemStyled>
  );
}
