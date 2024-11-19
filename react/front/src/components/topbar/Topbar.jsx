import React, { useState } from "react";
import axios from "axios";

import './topbar.css'
import { RiNotification4Line } from "react-icons/ri";
import { FiMoon } from "react-icons/fi";
import imgLogo from "./profile.png";
import { useNavigate } from "react-router-dom";



const Topbar = () => {
    const [ searchTerm, setSearchTerm ] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        console.log("검색어: ", searchTerm) // 오류 확인

        // 검색어가 입력되지 않은 경우 처리
        if (!searchTerm) {
            alert("검색어를 입력하세요.");
            return;
        }

        navigate(`/dashboard?keyword=${searchTerm}`);

        // 검색어가 입력된 경우 처리
        try {
            const response = await axios.get(`/api/trend`, {
                params: { keyword: searchTerm }
            });
            console.log("서버에서 받은 데이터: ", response.data);
            
        } catch (error) {
            console.error("오류 발생: ", error);
            console.log(error.response);    // 에러 응답 확인
        }
    };
    
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="searchWrapper">
                    <form onSubmit={handleSearch}>
                    <input 
                        type="search" 
                        placeholder="Search" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">🔍</button>
                    </form>
                </div>
                <div className="topIconWrapper">
                    {/* topbarIcon */}
                    <div className="topbarIconContainer">
                        <FiMoon />
                    </div>
                    {/* topbarIcon */}
                    <div className="topbarIconContainer">
                        <RiNotification4Line />
                        <span className="topIconBadge">2</span>
                    </div>
                    <img src={imgLogo} alt="" className="topAvatar" />
                </div>
            </div>
        </div>
        )
    }

export default Topbar;

