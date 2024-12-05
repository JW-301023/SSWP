import React, { useEffect, useState } from "react";
import axios from "axios";
import './featuredInfo.css'

import DailyChart from "../chart/Dailychart";
import MonthlyChart from "../chart/Monthlychart";
import GenderChart from "../chart/Genderchart";
import AgesChart from "../chart/Ageschart";

 const FeaturedInfo = ({ keyword }) => {
    const [dailyData, setDailyData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [genderData, setGenderData] = useState(null);
    const [agesData, setAgesData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    // 현재 날짜 기준 요청 데이터 생성
    const calculateDateRange = (timeUnit) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");

        if (timeUnit === "month") {
            // 월별 데이터: 해당 연도의 1월 1일부터 현재 날짜까지
            const startDate = `${year}-01-01`; // 1월 1일
            const endDate = `${year}-${month}-${day}`; // 오늘 날짜
            return { startDate, endDate };
        } else if (timeUnit === "date") {
            if (day <= 5) {
                const fourWeeksAgo = new Date(now.setDate(now.getDate() - 28));
                const startDate = fourWeeksAgo.toISOString().split("T")[0];
                const endDate = `${year}-${month}-${day}`;
                return { startDate, endDate }
            } else {
                // 일별 데이터: 해당 월의 1일부터 현재 날짜까지 \
                const startDate = `${year}-${month}-01`; 
                const endDate = `${year}-${month}-${day}`; // 오늘 날짜
                return { startDate, endDate };
            }
        }

        // 기본값: 전체 연도 기준
        const startDate = `${year}-01-01`;
        const endDate = `${year}-${month}-${day}`;
        return { startDate, endDate };

    };
        
    const fetchTrendData = async (timeUnit, type, value) => {
        if (!keyword || keyword.trim() === "") {
            console.error("유효하지 않은 검색어:", keyword);
            setError("검색어를 입력하세요.");
            return null; 
        }

        const { startDate, endDate } = calculateDateRange(timeUnit);
        const requestData = {
            startDate,
            endDate,
            timeUnit,
            keywordGroups: [
                { 
                    groupName: "trend", 
                    keywords: [keyword]
                }
            ],
            ...(type === "gender" ? { gender: value } : {}),
            ...(type === "age" ? { ages: value } : {}),
        };

        // 요청 데이터 로그 -> 잘됨
        // console.log("Request Data:", requestData);

        try {
            const response = await axios.post("/api/trend", requestData, {
                headers: { "Content-Type": "application/json" }
            });    
            
            // 응답 데이터 로그 -> 잘됨
            // console.log("API Response:", response.data);

            return response.data?.results || []; // API 응답 결과 반환

        } catch (err) {
            console.error("데이터 요청 실패:", err);
            return [];
        }
    };
  
  
    // 데이터 요청 및 처리
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 로딩 시작

            try {
                // 일별 데이터 요청
                const dailyResponse = await fetchTrendData("date");
                if (dailyResponse) {
                    const transformedData = dailyResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }));
                    setDailyData(transformedData);
                } 

                // 월별 데이터 요청
                const monthlyResponse = await fetchTrendData("month");
                if (monthlyResponse) {
                    const transformedMonthlyData = monthlyResponse[0]?.data.map((item) => ({
                        month: item.period, 
                        ratio: item.ratio, 
                      }));
                      setMonthlyData(transformedMonthlyData);
                }

                // 성별 데이터 요청
                const maleResponse = await fetchTrendData("date", "gender", "m");
                const femaleResponse = await fetchTrendData("date", "gender", "f");
                if (maleResponse && femaleResponse) {
                    const maleData = maleResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }));
                    const femaleData = femaleResponse[0]?.data.map((item) => ({
                        date: item.period,
                        ratio: item.ratio,
                    }));
                    setGenderData({
                        male: maleData,
                        female: femaleData,
                    });
                }


                // 연령별 데이터 요청
                const age10Response = await fetchTrendData("date", "age", ["1", "2"]);
                const age20Response = await fetchTrendData("date", "age", ["3", "4"]);
                const age30Response = await fetchTrendData("date", "age", ["5", "6"]);
                const age40Response = await fetchTrendData("date", "age", ["7", "8"]);
                const age50Response = await fetchTrendData("date", "age", ["9", "10"]);
                const age60Response = await fetchTrendData("date", "age", ["11"]);
                
                
                // 데이터 가공
                const ageResponses = [
                    { ageGroup: "10대", response: age10Response },
                    { ageGroup: "20대", response: age20Response },
                    { ageGroup: "30대", response: age30Response },
                    { ageGroup: "40대", response: age40Response },
                    { ageGroup: "50대", response: age50Response },
                    { ageGroup: "60대 이상", response: age60Response },
                ];
                
                const ageData = ageResponses.map(({ ageGroup, response }) => {
                    const total = response[0]?.data.reduce((sum, item) => {                        if (item.ratio) return sum + item.ratio;
                        return sum;
                    }, 0) || 0; // 기본값 처리

                    return { ageGroup, total };
                });

                const totalSum = ageData.reduce((sum, group) => sum + group.total, 0) || 1;
                const ageRatioData = ageData.map((group) => ({
                    ageGroup: group.ageGroup,
                    ratio: totalSum > 0 ? ((group.total / totalSum) * 100).toFixed(2) : "0.00", 
                }));                
            setAgesData(ageRatioData);                    

            } catch (err) {
                console.error("데이터 요청 실패: ", err);
                setError("데이터 요청에 실패했습니다.");
            } finally {
                setIsLoading(false); // 로딩 종료
            }          
        };
   
        fetchData();
    }, [keyword]);

    if (error) {
        return <p>{error}</p>;
    }

    if (isLoading) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    // console.log("Daily Data: ", dailyData);
    // console.log("Monthly Data: ", monthlyData);
    // console.log("Gender Data: ", genderData);
    // console.log("Ages Data: ", agesData);   
    
    return (
        <div>
            <div className="featured-container">
                <div className="barChart-container">
                    <span className="chartTitle">일별 검색률</span>
                        <DailyChart data={dailyData} />
                </div>
        
                <div className="pieChart-container">
                    <span className="chartTitle">성별 검색률</span>
                        <GenderChart data={genderData} />
                </div>
        
                <div className="doughnutChart-container">
                    <span className="chartTitle">연령별 검색률</span>
                        <AgesChart data={agesData} />
                </div>
            </div>

            <div className="another-container">
                <div className="lineChart-container">
                    <span className="lineTitle">월별 검색률</span>
                        <MonthlyChart data={monthlyData}/>
                </div>
            </div>
        </div>
    );

};
        

export default FeaturedInfo;
