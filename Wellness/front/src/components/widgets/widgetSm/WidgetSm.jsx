import React, { useState, useEffect } from "react";
import axios from "axios";
import './widgetSm.css'

export default function WidgetSm() {
    // const [keyword, setKeyword] = useState('wellness');
    // const [relatedKeywords, setRelatedKeywords] = useState([]);

    // useEffect(() => {
    //     if (keyword) {
    //         // Flask 서버에서 연관 검색어를 가져오는 함수
    //         fetchRelatedKeywords(keyword);
    //     }
    // }, [keyword]);

    // const fetchRelatedKeywords = async (keyword) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/get-related-keywords?keyword=${keyword}`);
    //         setRelatedKeywords(response.data.related_keywords);
    //     } catch (error) {
    //         console.error('연관검색어 서버 오류:', error);
    //     }
    // };

    return (
        
        <div className="widgetSm-containter">
            <span className="sm-title">연관 검색어</span>
            {/* <ul>
                    {relatedKeywords.map((kw, index) => (
                        <li key={index}>{kw}</li>
                    ))}
            </ul> */}
        </div>
    )
}