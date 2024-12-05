import React from 'react';
import './userinfo.css'

// 회원 정보 화면//
export default function UserInfo() {
    const userid = localStorage.getItem('userid'); // 저장된 사용자 ID 가져오기

    const handleLogout = () => {
        localStorage.removeItem('userid'); // 로그아웃 시 로컬 스토리지에서 사용자 정보 제거
        window.location.href = '/users'; // 로그인 화면으로 이동
    };

    return (
        <div className="user-info">
            <h2>User Info</h2>
            <p> Welcome😉 {userid}님</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
