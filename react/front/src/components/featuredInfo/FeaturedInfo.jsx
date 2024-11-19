import React from "react";
import './featuredInfo.css'
import { FaLongArrowAltUp } from "react-icons/fa";
import { FaLongArrowAltDown } from "react-icons/fa";

export default function FeaturdInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">일별 검색량</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">2,415</span>
                    <span className="featuredMoneyRate">
                        -11.4 <FaLongArrowAltDown className="featuredIcon negative" />
                    </span>       
                </div>
                <span className="featuredSub">Compared to last day</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">성별 검색량</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">1,234</span>
                    <span className="featuredMoneyRate">
                        -3.4 <FaLongArrowAltDown className="featuredIcon negative" />
                    </span>       
                </div>
                <span className="featuredSub">Compared to last day</span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">연령별 검색량</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">4,213</span>
                    <span className="featuredMoneyRate">
                        +11.4 <FaLongArrowAltUp  className="featuredIcon" />
                    </span>       
                </div>
                <span className="featuredSub">Compared to last day</span>
            </div>

        </div>
    )
}