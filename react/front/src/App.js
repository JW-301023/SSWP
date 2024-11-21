import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Signup from './pages/User/Signup';
import PrivateRoute from './pages/User/PrivateRoute';
import UserInfo from "./pages/User/UserInfo";
import Login from './pages/User/Login';

import './app.css';

// import axios from "axios";


function App() {
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Sidebar />
        <div className="container">
          <Routes>
            <Route path="/" element={<div className="home"><Home /></div>} />

            <Route path="/dashboard" element={<div className="dashboard"><Dashboard /></div>} />

            <Route path="/signup" element={<div className="Signup"><Signup /></div>} />

            {/* 로그인 화면은 /login으로 이동 */}
            <Route path="/login" element={<div className="Login"><Login /> </div>} />

            {/* 회원 정보 화면은 PrivateRoute로 보호 */}
            {/* 로그인 화면은 로그인하지 않은 사용자만 접근 가능 */}
            <Route path="/users" element={
              <PrivateRoute>
                <UserInfo />
              </PrivateRoute>
            } />
            {/* <Route path="/main/:category" element={<div className="detail"><Sidebar /></div>} /> */}
          </Routes>    
        </div>
      </div>
    </Router>
  );
}
export default App;