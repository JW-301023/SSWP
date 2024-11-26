import React from "react";
import './monthlychart.css'
import { Line } from "react-chartjs-2";
import { useLocation } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MonthlyChart = ({ data }) => {
    const location = useLocation();
    
    // 데이터 가공
    const labels = data.map((item) => item.month);
    const values = data.map((item) => item.ratio);  
    
    const chartData = {
            labels: labels,
            datasets: [
                {
                    label: `월별 검색량`,
                    data: values,
                    borderColor: "rgba(204, 234, 119, 1)",
                    backgroundColor: (context) => {
                        const chart = context.chart;
                        const { ctx, chartArea } = chart;

                        if (!chartArea) {
                            return null;
                        }

                        const gradient = ctx.createLinearGradient(
                            0,
                            chartArea.top,
                            0,
                            chartArea.bottom
                          );
                          gradient.addColorStop(0, "rgba(204, 234, 119, 0.8)");
                          gradient.addColorStop(1, "rgba(75, 192, 192, 0)");
                          return gradient; 
                    },
                    borderWidth: 3,
                    fill: true, 
                    pointRadius: 6, 
                    pointHoverRadius: 6,
                    pointBackgroundColor: "rgba(29, 29, 29, 1)",
                    pointHoverBackgroundColor: "#F5F5F5",
                    tension: 0.4
                }
        ]
    };

    const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false, 
                    label: {
                        boxWidth: 0
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            hover: {
                mode: "nearest", 
                intersect: true,
            },
            interaction: {
              mode: "index", 
              intersect: false,
            },
            scales: {
                x: {
                    title: {
                        display: true,
                    },
                    type: "category",
                    grid: {
                        display: true,
                        color: 'rgba(245, 245, 245, 0.2)', 
                        lineWidth: 1
                    },
                    ticks: {
                        color: "#F5F5F5", 
                        callback: function (value, index) {
                          const months = [
                            "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", 
                            "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
                          ];
                          const date = new Date(chartData.labels[index]);
                          return months[date.getMonth()];
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                    },
                    grid: {
                        display: true,
                        color: 'rgba(245, 245, 245, 0.2)', 
                        lineWidth: 1
                    },
                    ticks: {
                      color: "#F5F5F5",
                      stepSize: 25
                    },
                    beginAtZero: true,
                }
            }
        };

    
    // // 경로 변경 시 차트 데이터 초기화
    // useEffect(() => {
    //     setChartData(null);
    //     // setLoading(false);
    // }, [location.pathname]); 

    return (
        <div className="monthly-container">
            {chartData ? (
                <Line data={chartData} options={options} />
            ) : (
            <p className="loading-container">Loading chart...</p>
          )}
      </div>
  );
};

export default MonthlyChart;