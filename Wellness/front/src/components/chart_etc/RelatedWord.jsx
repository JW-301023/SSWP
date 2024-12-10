import React, { useState, useEffect, useRef } from "react";
import './relatedWord.css'
import axios from "axios";
import Chart from "chart.js/auto";
import { WordCloudController, WordElement } from "chartjs-chart-wordcloud";
// import * as d3 from "d3";

// Chart.js에 WordCloud 플러그인 등록
Chart.register(WordCloudController, WordElement);

const RelatedWord = ({ keyword }) => {
    const [suggestions, setSuggestions] = useState([]);
    const canvasRef = useRef(null);

    // 자동완성 검색어 요청 함수
    const fetchSuggestions = async (keyword) => {
        try {
            const response = await axios.get(`/api/related-keywords?keyword=${keyword}`);
            const data = response.data.map((word, index) => ({
                text: word,
                weight: Math.max(10, (20 - index) * 5), // 가중치 설정
            }));
            setSuggestions(data);
        } catch (error) {
            console.error('연관검색어 호출 실패', error);
        }
    };

    // 워드 클라우드 차트 생성 함수 
    const createWordCloud = () => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");

        // 기존 차트 제거
        if (ctx.chart) {
            ctx.chart.destroy();
        }

        const width = canvasRef.current.offsetWidth;
        const height = canvasRef.current.offsetHeight;

        // 글씨 크기 동적 계산
        const baseFontSize = Math.min(width, height) / 15;

        ctx.chart = new Chart(ctx, {
            type: "wordCloud",
            data: {
                labels: suggestions.map((item) => item.text),
                datasets: [
                    {
                        label: "Word Cloud",
                        data: suggestions.map((item) => item.weight),
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                layout: {
                    padding: 20,
                },
                elements: {
                    word: {
                        fontFamily: "Arial",
                        fontSize: (context) => {
                            const baseSize = context.raw * baseFontSize * 0.005; // 비례 크기 계산
                            return Math.min(30, Math.max(10, baseSize)); // 최소 10px, 최대 30px
                        },
                        rotate: () => (Math.random() < 0.5 ? 0 : 90),
                        color: () =>
                            `hsl(${Math.random() * 360}, 70%, 50%)`
                    }
                }
            }
        });
    };

    // keyword가 변경될 때마다 자동으로 연관 검색어를 가져옴
    useEffect(() => {
        if (keyword) {
            fetchSuggestions(keyword);
        } else {
            setSuggestions([]);
        }
    }, [keyword]); 

    // suggestions가 변경될 때마다 워드 클라우드 차트 생성
    useEffect(() => {
        if (suggestions.length > 0) {
            createWordCloud();
        }
    }, [suggestions]);


    return (
        <div className="related-word">
            <div className="related-word-title">연관 키워드</div>
                <div className="related-list">
                    <canvas ref={canvasRef} className="word-cloud-chart" />
                </div>
        </div>
    )
}

export default RelatedWord;