import React from "react";
import './home.css'

export default function Home() {
    return (
        <div className="home">
            <h1 className="home-description"> 
                Do you know <br/> Wellness Trend ?
            </h1>
            <div className="home-top-container">
                <p>여긴 탑</p>
                {/* <div className="content-box summary">
                    <p className="content-title">summary</p>
                    <div className="content-detail">

                    </div>
                </div>
                <div className="content-box news">
                    <p className="content-title">news</p>
                    <div className="content-detail">

                    </div>
                </div> */}
            </div>
            <div className="home-middle-container">
                <p>여긴 미들</p>
            </div>
            <div className="home-bottom-container">
                <p>여긴 바텀</p>
            </div>
        </div>
    )
}