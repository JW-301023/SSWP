import React, { useEffect, useState } from "react";
import './sidebar.css'
import axios from "axios";
import { TbBrandGoogleHome } from "react-icons/tb";
import { FaPersonRunning } from "react-icons/fa6";
import { TbBrain } from "react-icons/tb";
import { CgBulb } from "react-icons/cg";
import { RiCommandLine } from "react-icons/ri";
import { CgHeart } from "react-icons/cg";
import { FaRecycle } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { LuBookmark } from "react-icons/lu";
import { FaComments } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function Sidebar() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
        .then(response => {
            setCategories(response.data);
        })
        .catch(error => {
            console.error("There was an error fetching the categories!", error);
        })
    }, []);

    return ( 
        <div className="sidebar">
            <div className="sidebarWrapper">

                <div className="sidebarBrend">
                    <h1>Wellty</h1>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul>
                        <li onClick={() => navigate("/")}>
                            <TbBrandGoogleHome className="sidebarIcon" />
                            Home
                        </li>
                        <li onClick={() => navigate("/physical")}>
                            <FaPersonRunning className="sidebarIcon" />
                            Physical
                        </li>
                        <li onClick={() => navigate("/mental")}>
                            <TbBrain className="sidebarIcon" />
                            Mental
                        </li>
                        <li onClick={() => navigate("/spiritual")}>
                            <CgBulb className="sidebarIcon" />
                            Spiritual
                        </li>
                        <li onClick={() => navigate("/social")}>
                            <RiCommandLine className="sidebarIcon" />
                            Social
                        </li>
                        <li onClick={() => navigate("/emotional")}>
                            <CgHeart className="sidebarIcon" />
                            Emotional
                        </li>
                        <li onClick={() => navigate("/environmental")}>
                            <FaRecycle className="sidebarIcon" />
                            Environmental
                        </li>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick</h3>
                    <ul>
                        <li onClick={() => navigate("/users")}>
                            <FaRegCircleUser className="sidebarIcon" />
                            Users
                        </li>
                        <li onClick={() => navigate("/reports")}>
                            <LuBookmark className="sidebarIcon" />
                            Reports
                        </li>
                        <li onClick={() => navigate("/community")}>
                            <FaComments className="sidebarIcon" />
                            Community
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;