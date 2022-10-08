import { Typography } from "antd";
import { instance } from "apis/apis";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { OptionsChart } from "../OptionsChart";
export default function OrderAnalyze() {
  const [orderData, setOrderData] = useState([]);
  const [label, setLabel] = useState();
  const middleChartData = {
    labels: orderData?.map((item) => {
      return item.dayOfWeek;
    }),
    datasets: [
      {
        label: label,
        data: orderData?.map((item) => item.total),
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
    instance("/api/User/Analytic/Order")
      .then((res) => {
        setOrderData(res.data.data.dateWithTotalPrices);
        setLabel(res.data.data.label);
        console.log("order", res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" sale-chart-content">
      <Typography.Title>Sale</Typography.Title>
      <div className="wrapper-middle-chart">
        <Line
          data={middleChartData}
          options={OptionsChart.Middle}
          className=""
        />
      </div>
    </div>
  );
}
