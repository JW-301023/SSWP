import React from "react";
import './home.css'

export default function Home() {
    return (
        <div className="home">
            <h1 className="home-description"> 
                Do you know <br/> Wellness Trend ?
            </h1>
            <div className="content">
                <div className="content-box summary">
                    <p className="content-title">summary</p>
                    <div className="content-detail">

                    </div>
                </div>
                <div className="content-box news">
                    <p className="content-title">news</p>
                    <div className="content-detail">

                    </div>
                </div>
            </div>
        </div>
    )
}