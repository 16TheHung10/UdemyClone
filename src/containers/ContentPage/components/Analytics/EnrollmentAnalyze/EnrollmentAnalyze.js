import { Typography } from "antd";
import { instance } from "apis/apis";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { OptionsChart } from "../OptionsChart";
export default function EnrollmentAnalyze() {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [label, setLabel] = useState();
  const dataLineHeader = {
    labels: enrollmentData?.map((item) => {
      return item.dayOfWeek;
    }),
    datasets: [
      {
        label: label,
        data: enrollmentData?.map((item) => item.value),
        backgroundColor: "#ed2a26",
        borderWidth: 2,
        borderColor: "#ed2a26",
        tension: 0.5, // curve of line
        showLine: true, //Show line of line chart,
        spanGaps: false,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: "white", //color of point,
        pointHoverBackgroundColor: "white", //color of point,
        pointBorderColor: "#ed2a26", //color of border point
        pointBorderWidth: 2,
        pointHitRadius: 30, //chua hover den tootip da hien
      },
    ],
  };
  useEffect(() => {
    instance("/api/User/Analytic/enrollment")
      .then((res) => {
        setEnrollmentData(res.data.data.data);
        setLabel(res.data.data.label);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleTotalenrollment = () => {
    let total = 0;
    for (let value of enrollmentData) {
      total += value.value;
    }
    return total;
  };
  return (
    <div className="chart-content">
      <Typography.Title>{handleTotalenrollment()}</Typography.Title>
      <Typography.Paragraph>Enrollment</Typography.Paragraph>

      <div className="wrapper-chart">
        <Line
          data={dataLineHeader}
          options={OptionsChart.Top}
          className="chart-bar"
        />
      </div>
    </div>
  );
}
