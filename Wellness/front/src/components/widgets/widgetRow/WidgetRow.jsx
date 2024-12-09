import React, { useState, useEffect, useRef } from "react";
import './widgetrow.css'
import axios from "axios";
import * as d3 from "d3";

const WidgetRow = ({ keyword }) => {
    const [suggestions, setSuggestions] = useState([]);
    const svgRef = useRef(null);


    // 자동완성 검색어 요청 함수
    const fetchSuggestions = async (keyword) => {
        try {
            const response = await axios.get(`/api/related-keywords?keyword=${keyword}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('연관검색어 호출 실패', error);
        }
    };

    // keyword가 변경될 때마다 자동으로 연관 검색어를 가져옴
    useEffect(() => {
        if (keyword) {
            fetchSuggestions(keyword);
        } else {
            setSuggestions([]);
        }
    }, [keyword]); // keyword가 변경될 때마다 useEffect 실행


    // D3.js를 사용한 네트워크 그래프 생성
    useEffect(() => {
        if (!svgRef.current || suggestions.length === 0) return;

        const width = svgRef.current.clientWidth;
        const height = svgRef.current.clientHeight;

        // SVG 초기화
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

         // 데이터 준비
         const data = [
            { id: keyword, value: 100 }, // 중앙 키워드
            ...suggestions.map((suggestion) => ({
                id: suggestion,
                value: Math.random() * 60 + 10, // 각 키워드의 크기를 임의로 설정
            })),
        ];

        const pack = d3.pack()
            .size([width, height])
            .padding(0);

        const root = d3.hierarchy({ children: data })
            .sum(d => d.value);

        const nodes = pack(root).leaves();


        // 버블 생성
        const bubble = svg.selectAll("g")
            .data(nodes)
            .join("g")
            .attr("transform", d => `translate(${d.x}, ${d.y})`);

        bubble.append("circle")
            .attr("r", d => d.r)
            .attr("fill", (d, i) => d3.schemeCategory10[i % 10]);

        bubble.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.3em")
            .text(d => d.data.id)
            .style("font-size", d => `${d.r / 3}px`)
            .style("fill", "#fff");
    }, [suggestions, keyword]);


    return (
        <div className="widgetRow-container">
            <div className="widgetRow-title">연관 키워드</div>
                <div className="relatedList">
                    <svg ref={svgRef} className="bubble-chart" />
                </div>
        </div>
    )
}

export default WidgetRow;