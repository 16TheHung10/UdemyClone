import { Button, Col, Image, Row, Typography } from "antd";
import React from "react";
import { CardStyled } from "./CardStyled";
const { Title, Text, Paragraph } = Typography;
export default function Card({ describe, img }) {
  const { view, date, title, summary } = describe;
  return (
    <CardStyled>
      <Row gutter={[16, 16]}>
        <Col sm={24} lg={10}>
          <Image className="card-image" src={img} preview={false} />
        </Col>

        <Col sm={24} lg={14}>
          <div className="card-text">
            <div className="card-text-top">
              <Text>{view} views</Text>
              {"-"}
              <Text>{date}</Text>
            </div>
            <Title className="card-text-title" level={5}>
              {title}
            </Title>
            <Paragraph>{summary}</Paragraph>
          </div>
          <Button type="text" className="readmore">{`Read more >>`}</Button>
        </Col>
      </Row>
    </CardStyled>
  );
}
