import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import PrivateRoute from './pages/user/PrivateRoute';
import UserInfo from "./pages/user/UserInfo";
import LoginSlider from './pages/user/Loginslider';
import Community from "./pages/Community/Community";
import CreatePostModal from "./pages/Community/CreatePostModal";
import PostDetail from "./pages/Community/PostDetail";
import EditPost from "./pages/Community/EditPost";

// import Login from './pages/user/Login';
import './app.css';
// import axios from "axios";

function App() {
  const userid = localStorage.getItem('userid');
  return (
    <Router>
      <div className="App">
        <Topbar />
        <Sidebar />
        <div className="container">
          <Routes>
            <Route path="/" element={<div className="home"><Home /></div>} />

            <Route path="/dashboard" element={<div className="dashboard"><Dashboard /></div>} />
            <Route path="/community" element={<div className="Community"><Community/></div>}/>
            <Route path="/community/:id" element={<div className="PostDetail"> <PostDetail/></div>}/>
            <Route path="/community/edit/:id" element={<div className="EditPost"><EditPost/></div>} />

            {/* 로그인한 사용자만 접근 가능 */}
            <Route path="/create"
                   element={
                     <PrivateRoute>
                       <div className="CreatePostModal"><CreatePostModal/></div>
                     </PrivateRoute>}
            />

            {/* 로그인 화면은 /login으로 이동 */}
            <Route 
              path="/login" 
              element={<LoginSlider />}
            />

            {/* 회원 정보 화면은 PrivateRoute로 보호 */}
            {/* 로그인 화면은 로그인하지 않은 사용자만 접근 가능 */}
            <Route path="/users" element={
              <PrivateRoute>
                <UserInfo />
              </PrivateRoute>
            } />
          </Routes>    
        </div>
      </div>
    </Router>
  )
}


export default App