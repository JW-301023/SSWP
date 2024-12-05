import React, { useState, useEffect } from "react";
import './widgetLg.css'
import axios from "axios";

function WidgetLg() {
    // const [keyword, setKeyword] = useState("");
    // const [suggestions, setSuggestions] = useState([]);
    // const [loading, setLoading] = useState(false); 


    // // 자동완성 검색어 요청 함수
    // const fetchSuggestions = async (keyword) => {
    //     if (!keyword) {
    //         setSuggestions([]);
    //         console.log("검색 결과 없음. 연관검색어 초기화");   // 디버깅
    //         return;
    //     }
    //     setLoading(true);

    //     try {
    //         const response = await axios.get(`/api/related-keywords?keyword=${keyword}`);
    //         console.log("API 응답 데이터:", response.data);  // 디버깅
    //         setSuggestions(response.data);
    //     } catch (error) {
    //         console.error('연관검색어 호출 실패', error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // keyword가 변경될 때마다 자동으로 연관 검색어를 가져옴
    // useEffect(() => {
    //     console.log("검색어:", keyword);
    //     if (keyword) {
    //         fetchSuggestions(keyword);
    //     } else {
    //         setSuggestions([]);
    //     }
    // }, [keyword]); // keyword가 변경될 때마다 useEffect 실행


    return (
        <div className="widgetLg-container">
            <div className="widgetLg-title">연관 키워드</div>
            {/* <ul className="relatedList">
                {suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
            </ul> */}
        </div>
    )
}

export default WidgetLg;