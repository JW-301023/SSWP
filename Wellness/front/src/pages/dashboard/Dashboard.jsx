import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";
// import axios from "axios";
import './dashboard.css'
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgets/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgets/widgetSm/WidgetSm";
import WidgetCol from "../../components/widgets/widgetCol/WidgetCol";

export default function Dashboard() {
    const location = useLocation();
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true); // 로딩 상태를 관리하는 state

    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const keywordFromURL = params.get("keyword");

        if (keywordFromURL) {
            setKeyword(keywordFromURL);
        }

        // 키워드가 설정되면 로딩 상태를 false로 변경
        if (keywordFromURL || keyword) {
            setLoading(false);
        }

        // 키워드를 Flask 서버로 보내는 로직
        // if (keywordFromURL) {
        //     fetchTweetsFromFlask(keywordFromURL);
        // }

    }, [location, keyword]);

    // 로딩 중일 때 보여줄 UI
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-overlay"></div> {/* 화면 흐림 효과 */}
                <PropagateLoader color="#C5EB64" size={25} />
            </div>
        );
    }

    // const fetchTweetsFromFlask = async (keyword) => {
    //     try {
    //         const response = await axios.get(`http://localhost:5000/search_tweets?keyword=${keyword}`);
    //         console.log(response.data);  // 트윗 데이터 확인
    //     } catch (error) {
    //         console.error('Error fetching tweets from Flask:', error);
    //     }
    // };


    return (
        <div className="dashboard">
            <div className="widgets-container">
                <FeaturedInfo keyword={keyword} />
                <div className="row-container">
                    <WidgetSm />
                    <WidgetLg keyword={keyword} />
                </div>
            </div>
            <div className="col-container">
                <WidgetCol keyword={keyword} />
            </div>
        </div>
    )
}