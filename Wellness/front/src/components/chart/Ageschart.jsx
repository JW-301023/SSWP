import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const AgesChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Loading age chart...</p>;
  }

  // 비율 데이터 정렬 (내림차순)
  const sortedData = [...data].sort((a, b) => b.ratio - a.ratio);
  const labels = sortedData.map((item) => item.ageGroup);
  const values = sortedData.map((item) => item.ratio);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
            "rgba(255, 99, 132, 0.6)", // 10대: 빨간색
            "rgba(54, 162, 235, 0.6)", // 20대: 파란색
            "rgba(255, 206, 86, 0.6)", // 30대: 노란색
            "rgba(75, 192, 192, 0.6)", // 40대: 녹색
            "rgba(153, 102, 255, 0.6)", // 50대: 보라색
            "rgba(255, 159, 64, 0.6)",  // 60대 이상: 주황색
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    const value = context.raw;
                    return `${context.label}: ${value}%`;
                },
            },
        },
    },
  };

  return (
    <div className="ages-container">
      <Pie data={chartData} options={options}/>
    </div>
  );
};

export default AgesChart;
