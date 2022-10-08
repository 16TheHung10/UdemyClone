import { BookOutlined } from "@ant-design/icons";
import { Col, Image, Row, Table, Tag } from "antd";
import { getAllPurchaseCourse } from "apis/features/Statement/Statement";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Wrapper from "./StatementPageStyled";

const StatementPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {}, []);

  const convertDateTime = (data) => {
    const myStringDate = `${new Date(data)}`;

    return myStringDate.slice(0, myStringDate.search("GMT"));
  };

  const columns = [
    {
      title: (
        <div className="text-center">
          <span>Order ID</span>
        </div>
      ),
      dataIndex: "orderId",
      key: "orderId",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <div className="text-center">
          <span>Title</span>
        </div>
      ),
      dataIndex: "title",
      key: "title",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
      // render: (text) => <a>{text}</a>,
    },
    {
      title: (
        <div className="text-center">
          <span>Type</span>
        </div>
      ),
      dataIndex: "type",
      key: "type",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          {text === "buy" && <Tag color="#108ee9">Buying</Tag>}
          {text === 1 && <Tag color="#87d068">Approved</Tag>}
          {text === 2 && <Tag color="#f50">Reject</Tag>}
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Total</span>
        </div>
      ),
      dataIndex: "amount",
      key: "amount",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Fee</span>
        </div>
      ),
      dataIndex: "fee",
      key: "fee",
      width: "5%",
      render: (text) => (
        <div className="text-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: (
        <div className="text-center">
          <span>Created Date</span>
        </div>
      ),
      dataIndex: "date",
      key: "date",
      width: "8%",
      render: (text) => (
        <div className="text-center">
          <span className="long-content">{convertDateTime(text)}</span>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
      {/* Section 1 */}
      <h2 className="header">
        <BookOutlined className="bookIcon" />
        Statements
      </h2>

      {/* Section 2 */}
      <Row>
        <Col span={24} className="area1">
          <div className="creation-course">
            <h3 className="earnings-header">Earnings</h3>
            <div className="earnings-body">
              <p>Your sales earnings over last 30 days</p>
              <div className="d-flex justify-content-between">
                <Col span={8} className="my-funds price">
                  <p>My Funds</p>
                  <h1>$289.52</h1>
                </Col>
                <Col span={8} className="earnings price">
                  <p>My Funds</p>
                  <h1>+ $289.52</h1>
                </Col>
                <Col span={8} className="cursus-fee price">
                  <p>My Funds</p>
                  <h1>- $289.52</h1>
                </Col>
              </div>
            </div>
          </div>
        </Col>
        {/* <Col span={8} className="area2">
          <div className="creation-course">
            <h3 className="earnings-header">Earnings</h3>
            <div className="earnings-body"></div>
          </div>
        </Col> */}
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        scroll={{
          x: 1000,
        }}
      />
    </Wrapper>
  );
};

export default StatementPage;
