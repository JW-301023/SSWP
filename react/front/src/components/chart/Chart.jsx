import React, { useEffect, useState } from "react";
import "./chart.css"
import axios from "axios";
import { Line } from "react-chartjs-2";
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

// const Plugins = {
//     id: "customBackgroundColor",
//     beforeDraw: (chart) => {
//         const { ctx, chartArea } = chart;
//         ctx.save();
//         ctx.fillStyle = "#1d1d1d"; // 원하는 배경색
//         ctx.fillRect(
//             chartArea.left,
//             chartArea.top,
//             chartArea.right - chartArea.left,
//             chartArea.bottom - chartArea.top
//         );
//         ctx.restore();
//     },
// };

// // Chart.js 플러그인 등록
// ChartJS.register(Plugins);

const Chart = ({ keyword }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log("데이터 요청 시작", keyword);
            try {
                const response = await axios.get(`/api/trend`, {
                    params: { keyword },
                });

                console.log("서버 응답 데이터: ", response.data);

                // 데이터 가공
                const results = response.data.results[0];
                const labels = results.data.map((item) => item.period);
                const values = results.data.map((item) => item.ratio);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: `"${keyword}" 월별 검색량`,
                            data: values,
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 2,
                            pointBackgroundColor: "rgba(75, 192, 192, 1)", // 포인트 색상
                            pointHoverBackgroundColor: "#ff6384", // 마우스 오버 시 포인트 색상
                            backgroundColor: "rgba(75, 192, 192, 0.3)", // 채우기 배경색 (투명도 포함)
                            fill: true, // 그래프 아래 영역 채우기
                        },
                    ],
                });

            } catch (error) {
                console.error("데이터 요청 오류: ", error);
            }
        };

        if (keyword !== "wellness") {
            fetchData();
        }
    }, [keyword]);

    return (
        <div className="chart-container">
            <h3 className="chartTitle">월별 검색량</h3>
            {chartData ? (
                <Line 
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { 
                            display: false, 
                            position: "top", 
                            labels: {
                                boxWidth: 0, // 네모 박스 제거
                                color: "#fff",
                            },
                            // customBackgroundColor: {},
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                            },
                            type: "category",
                            ticks: {
                                color: "#fff", 
                                callback: function (value, index) {
                                  const months = [
                                    "Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", 
                                    "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."
                                  ];
                                  const date = new Date(chartData.labels[index]);
                                  return months[date.getMonth()];
                                },
                            },
                        },
                        y: {
                            title: {
                                display: true,
                            },
                            ticks: {
                                color: "#fff"
                                // min: 0,
                                // max: 100
                            },
                            beginAtZero: true, // y축을 0부터 시작
                        },
                    },
                  }}
                />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
;}

export default Chart;

