import React, { useEffect, useState } from "react";
import axios from "axios";
import './login.css';
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // 이미 로그인했으면 로그인 화면 건너뛰고 홈으로 이동
    useEffect(() => {
        const loggedInUser = localStorage.getItem('userid');
        if (loggedInUser){
            navigate('/');
        }
    }, [navigate]);

    /* 회원가입 */
    const handleSignupRedirect = () => {
        navigate('/signup');
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼의 기본 동작 페이지 새로고침 막기

        try {
            // 서버로 로그인 요청 보내기
            const response = await axios.post('http://localhost:8080/api/login', {
                userid,
                password,
            });

            // 요청 성공 시 처리
            if (response.status === 200) {
                alert('로그인 성공');
                // console.log('userid to be stored:', userid); // 디버깅: userid 값 확인
                localStorage.setItem('userid', userid); // 로컬스토리지에 사용자 정보 저장
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setErrorMessage('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
            } else {
                setErrorMessage('서버 오류. 다시 시도해주세요!');
            }
        }

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome Back!</h1>
                {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="ID"
                            value={userid}
                            onChange={(e) => setUserid(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                             placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">SIGN IN</button>
                </form>
                <button onClick={handleSignupRedirect} type="button">SIGN UP</button>
            </div>
        </div>
    );
}


