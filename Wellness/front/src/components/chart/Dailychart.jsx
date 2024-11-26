import React, { useMemo } from "react";
import './dailychart.css'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { color } from "chart.js/helpers";

// Chart.js에 필요한 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyChart = ({ data }) => {
  // 데이터 5일 단위로 묶고 평균 비율 계산
  const groupedData = useMemo(() => {
    const groupSize = 10; // 10일 단위
    const result = [];

    for (let i = 0; i < data.length; i += groupSize) {
      const group = data.slice(i, i + groupSize); // 5일 단위로 데이터 묶기
      const groupLabel = `${i + 1}-${Math.min(i + groupSize, data.length)}`; // 1-5, 6-10 등 범위 라벨 생성
      const groupAverageRatio = group.reduce((sum, item) => sum + item.ratio, 0) / group.length; // 평균 비율 계산
      result.push({ label: groupLabel, value: groupAverageRatio });
    }

    return result;
  }, [data]);

  const labels = groupedData.map((item) => item.label);
  const values = groupedData.map((item) => item.value);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "일별 검색량",
        data: values,
        backgroundColor: "rgba(7, 7, 7, 1)",
        borderRadius: 8, 
        barThickness: 30,
        hoverOffset: 4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true, // 툴팁 활성화
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `평균 비율: ${value.toFixed(2)}%`;
          }
        }
      }   
    },
    scales: {
      x: {
        title: {
          display: false,
          font: {
            size: 14,
            weight: "bold"
          },
          color: "#333"
        },
        grid: {
          display: false,
        },
        ticks: {
          color: "#333",
          font: {
            size: 12
          }
        },
        border: {
          color: "#333",
          width: 2
        }
      },
      y: {
        title: {
          display: true,
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#333"
        },
        beginAtZero: true,
        grid: {
          display: true,
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          color: "#333",
          font: {
            size: 12,
          },
          stepSize: 25
        },
        border: {
          color: "#333",
          width: 2
        }
      }
    }
  };


  return (
    <div className="daliy-container">
        <Bar data={chartData} options={options} />
    </div>
  );
};

export default DailyChart;
