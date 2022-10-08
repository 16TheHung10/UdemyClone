import React, { useState } from "react";
import { AnalyticsWrapper } from "./AnalyticsStyled";
import { Chart as ChartJS } from "chart.js/auto"; //Do not delete this line
import { Bar, Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import { OptionsChart } from "./OptionsChart";
import EnrollmentAnalyze from "./EnrollmentAnalyze/EnrollmentAnalyze";
import SubcribesAnalyze from "./SubcribesAnalyze/SubcribeAnalyze";
import OrderAnalyze from "./OrderAnalyze/OrderAnalyze";
export default function Analytics() {
  const [selectedSegment, setSelectedSegment] = useState(1);
  const [selectedSegmentData, setSelectedSegmentData] = useState();

  return (
    <AnalyticsWrapper>
      <Row gutter={[16, 16]} className="top-chart-row">
        <Col span={24} md={12} className="top-chart">
          <SubcribesAnalyze />
        </Col>
        <Col span={24} md={12} className="top-chart">
          <EnrollmentAnalyze />
        </Col>
        {/* <Col span={24} md={8} className="top-chart">
          <div className="chart-content">
            <Typography.Title>900</Typography.Title>
            <Typography.Paragraph className="top-chart-title">
              Subcribe
            </Typography.Paragraph>
            <div className="wrapper-chart">
              <Line
                data={dataLineHeader2}
                options={OptionsChart.Top}
                className="chart-bar"
              />
            </div>
          </div>
        </Col> */}
      </Row>
      <Row className="sale-chart">
        {/* <div className=" sale-chart-content">
          <Typography.Title>Sale of the year</Typography.Title>
          <div className="wrapper-middle-chart">
            <Line
              data={middleChartData}
              options={OptionsChart.Middle}
              className=""
            />
          </div>
        </div> */}
        <OrderAnalyze />
      </Row>

      {/* bottom chart */}
      {/* <Row className="bottom-chart">
        <Col span={16} className="bottom-chart-item">
          <div className=" content">
            <div className="content-header">
              <div className="title">
                <Typography.Title>User Activity</Typography.Title>
              </div>
              <div className="header-feature">
                <div className="segment">{renderSegment()}</div>
              </div>
            </div>
            <div className="content-chart">
              <Line
                data={dataBottom}
                options={OptionsChart.Middle}
                className=""
              />
            </div>
            <div className="content-footer">
              <Typography.Title level={3}>AUDIENCE</Typography.Title>
            </div>
          </div>
        </Col>
        <Col span={8} className="bottom-chart-item">
          <div className="content">
            <div className="content-header right">
              <div className="title">
                <Typography.Title>900</Typography.Title>
              </div>
              <div className="header-feature right">
                <Typography.Title level={4} className="header-feature-title">
                  Ave Page views per minute
                </Typography.Title>
                <Typography.Title level={4}>9</Typography.Title>
              </div>
            </div>
            <div className="content-chart">
              <Bar
                height="100%"
                data={dataBarHeader}
                options={OptionsChart.Bottom}
                className="chart-bar"
              />
            </div>
            <div className="content-footer">
              <Typography.Title level={3}>AUDIENCE</Typography.Title>
            </div>
          </div>
        </Col>
      </Row> */}
    </AnalyticsWrapper>
  );
}
