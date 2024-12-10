import React, { useEffect, useState } from "react";
import axios from "axios";

import './topbar.css'
import { RiNotification4Line } from "react-icons/ri";
import { FiMoon } from "react-icons/fi";
import imgLogo from "./profile.png";
import { useNavigate } from "react-router-dom";



const Topbar = () => {
    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const userId = localStorage.getItem("userid");
    const [ searchTerm, setSearchTerm ] = useState("");
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();

        console.log("검색어: ", searchTerm) // 오류 확인

        // 검색어가 입력되지 않은 경우 처리
        if (!searchTerm || searchTerm.trim() === "") {
            alert("검색어를 입력하세요.");
            return;
        }

        navigate(`/dashboard?keyword=${searchTerm}`);
    };

    //로고 클릭하여 로그인 페이지로 이동
    const handleLogoClick = () => {
        navigate('/users');
    }

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/api/notifications/${userId}`);
                setNotifications(response.data);
            } catch (error) {
                console.error("알림 불러오기 실패:", error);
            }
        };
        fetchNotifications();
    }, [userId]);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleNotificationClick = async (id, postId) => {
        try {
            await axios.put(`/api/notifications/${id}`);
            window.location.href = `/community/${postId}`;
        } catch (error) {
            console.error("알림 읽음 처리 실패:", error);
        }
    };


    return (
        <div className="topbar">
            <div className="topbar-container">
                <div className="top-searchBar">
                    <form onSubmit={handleSearch}>
                        <input 
                            type="text" 
                            placeholder="Search" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">🔍</button>
                    </form>
                </div>
                <div className="topbarIcon-container">
                    {/* topbarIcon */}
                    <FiMoon />
                    <RiNotification4Line onClick={toggleDropdown} style={{ cursor: "pointer" }}/>
                    {showDropdown && (
                            <div className="notification-dropdown">
                                {notifications.length > 0 ? (
                                    notifications.map((notif) => (
                                        <div key={notif.id} onClick={() => handleNotificationClick(notif.post_id)}>
                                            <p>{notif.content}</p>
                                            <span>{new Date(notif.created_at).toLocaleString()}</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>알림이 없습니다.</p>
                                )}
                            </div>
                        )}
                    <img src={imgLogo} alt="" className="topAvatar" onClick={handleLogoClick}
                        style={{cursor:"pointer"}}/>
                </div>
            </div>
        </div>
    );
}

export default Topbar;

