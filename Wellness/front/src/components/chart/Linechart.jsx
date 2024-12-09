// import React, { useEffect, useState } from "react";
// import axios from "axios";


// const LineChart = ({ keyword }) => {
//     const [dailyData, setDailyData] = useState([]);
//     const [monthlyData, setMonthlyData] = useState([]);
//     const [selectedChart, setSelectedChart] = useState("all"); // Default to "all"
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     // Calculate date ranges for API requests
//     const calculateDateRange = (timeUnit) => {
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = String(now.getMonth() + 1).padStart(2, "0");
//         const day = String(now.getDate()).padStart(2, "0");

//         if (timeUnit === "month") {
//             return { startDate: `${year}-01-01`, endDate: `${year}-${month}-${day}` };
//         } else if (timeUnit === "date") {
//             return { startDate: `${year}-${month}-01`, endDate: `${year}-${month}-${day}` };
//         }
//         return { startDate: `${year}-01-01`, endDate: `${year}-${month}-${day}` };
//     };

//     // Fetch trend data from API
//     const fetchTrendData = async (timeUnit) => {
//         if (!keyword || keyword.trim() === "") {
//             setError("검색어를 입력하세요.");
//             return null;
//         }

//         const { startDate, endDate } = calculateDateRange(timeUnit);
//         const requestData = {
//             startDate,
//             endDate,
//             timeUnit,
//             keywordGroups: [{ groupName: "trend", keywords: [keyword] }],
//         };

//         try {
//             const response = await axios.post("/api/trend", requestData, {
//                 headers: { "Content-Type": "application/json" },
//             });
//             return response.data?.results || [];
//         } catch (err) {
//             console.error("데이터 요청 실패:", err);
//             setError("데이터 요청에 실패했습니다.");
//             return [];
//         }
//     };

//     // Fetch data on component mount or when `keyword` changes
//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);

//             try {
//                 const dailyResponse = await fetchTrendData("date");
//                 if (dailyResponse) {
//                     const transformedDailyData = dailyResponse[0]?.data.map((item) => ({
//                         date: item.period,
//                         ratio: item.ratio,
//                     }));
//                     setDailyData(transformedDailyData);
//                 }

//                 const monthlyResponse = await fetchTrendData("month");
//                 if (monthlyResponse) {
//                     const transformedMonthlyData = monthlyResponse[0]?.data.map((item) => ({
//                         date: item.period,
//                         ratio: item.ratio,
//                     }));
//                     setMonthlyData(transformedMonthlyData);
//                 }
//             } catch (err) {
//                 setError("데이터 요청에 실패했습니다.");
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [keyword]);

//     // Chart rendering logic
//     const renderChart = () => {
//         if (selectedChart === "daily") {
//             return <LineChart data={dailyData} title="일별 검색률" />;
//         } else if (selectedChart === "monthly") {
//             return <LineChart data={monthlyData} title="월별 검색률" />;
//         } else {
//             const combinedData = [...dailyData, ...monthlyData].sort((a, b) =>
//                 new Date(a.date) - new Date(b.date)
//             );
//             return <LineChart data={combinedData} title="전체 검색률" />;
//         }
//     };

//     // Loading and error handling
//     if (error) {
//         return <p>{error}</p>;
//     }

//     if (isLoading) {
//         return <p>데이터를 불러오는 중입니다...</p>;
//     }

//     // Main render
//     return (
//         <div className="lineChart-container">
//             <div className="chart-controls">
//                 <button
//                     className={selectedChart === "all" ? "active" : ""}
//                     onClick={() => setSelectedChart("all")}
//                 >
//                     전체
//                 </button>
//                 <button
//                     className={selectedChart === "daily" ? "active" : ""}
//                     onClick={() => setSelectedChart("daily")}
//                 >
//                     일별
//                 </button>
//                 <button
//                     className={selectedChart === "monthly" ? "active" : ""}
//                     onClick={() => setSelectedChart("monthly")}
//                 >
//                     월별
//                 </button>
//             </div>
//             <div className="lineChart-container">{renderChart()}</div>
//         </div>
//     );
// };

// export default LineChart;
