import React, { useEffect, useState } from "react";
import { useLocation} from "react-router-dom";
import Chart from "../../components/chart/Chart";
import FeaturdInfo from "../../components/featuredInfo/FeaturedInfo";
import './dashboard.css'
import WidgetLg from "../../components/widgets/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgets/widgetSm/WidgetSm";
import WidgetCol from "../../components/widgets/widgetCol/WidgetCol";

export default function Dashboard() {
    const location = useLocation();
    const [keyword, setKeyword] = useState("wellness");
    
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const keywordFromURL = params.get("keyword");

        if (keywordFromURL) {
            setKeyword(keywordFromURL);
        }
    }, [location]);

    return (
        <div className="dashboard">
            <div className="widgets">
                <FeaturdInfo />
                <Chart keyword={keyword} />
            </div>
            <div className="row">
                <WidgetSm />
                <WidgetLg />
            </div>
            <div className="col">
                <WidgetCol />
            </div>
        </div>
    )
}