import React, { useState } from 'react';
import axios from 'axios';
import './signup.css';
import {useNavigate} from "react-router-dom";


export default function Signup() {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/signup', {
                userid,
                password,
            });

            if (response.status === 201) {
                alert('회원가입이 완료되었습니다!');
                setErrorMessage('');
                setUserid('');
                setPassword('');
                setConfirmPassword('');
                navigate('/users');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // 서버에서 유효성 검사 실패 시 메시지 표시
                setErrorMessage(error.response.data);
            } 
        }
    };

    const handleSigninRedirect = () => {
        navigate('/signin'); // 로그인 페이지로 이동
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Hello, Freind!</h2>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">SIGN UP</button>
                </form>
            </div>
        </div>
    );
}
