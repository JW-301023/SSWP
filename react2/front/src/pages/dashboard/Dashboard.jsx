import React from "react";
import Chart from "../../components/chart/Chart";
import FeaturdInfo from "../../components/featuredInfo/FeaturedInfo";
import './dashboard.css'
import { userData } from '../../dummyData' 
import WidgetLg from "../../components/widgets/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgets/widgetSm/WidgetSm";
import WidgetCol from "../../components/widgets/widgetCol/WidgetCol";

export default function Dashboard() {
    return (
        <div className="dashboard">
            <div className="Widgets">
                <FeaturdInfo />
                    <Chart 
                        data={userData}
                        title="월별 검색량"
                        grid
                        dataKey="Active User"
                    />
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