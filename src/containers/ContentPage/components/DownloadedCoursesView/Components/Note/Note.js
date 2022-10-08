import { Col, Row } from "antd";
import React from "react";
import NoteItem from "./NoteItem/NoteItem";

export default function Note({ listNote, title, seekToNote }) {
  return (
    <div>
      <Row gutter={[16, 16]}>
        {listNote
          ?.sort((a, b) => a.time - b.time)
          .map((item, index) => {
            console.log("note", item);

            return (
              <Col
                key={index}
                xs={24}
                sm={24}
                md={12}
                onClick={() => {
                  seekToNote(item.time);
                }}
              >
                <NoteItem note={item} title={title} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
}
