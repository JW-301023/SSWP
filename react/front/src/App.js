import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
// import Detail from './pages/detail/Detail';
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

            {/* <Route path="/main/:category" element={<div className="detail"><Sidebar /></div>} /> */}
          </Routes>    
        </div>
      </div>
    </Router>
  )
}


export default App