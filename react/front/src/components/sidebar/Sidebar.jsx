import React from "react";
import './sidebar.css'
import { TbBrandGoogleHome } from "react-icons/tb";
import { TbLayoutDashboard } from "react-icons/tb";
import { CgUser } from "react-icons/cg";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const navigate = useNavigate();

    // 카테고리와 아이콘 정의
    const categories = [
        { name: "Home", path: "/", icon: <TbBrandGoogleHome className="sidebarIcon" /> },
        { name: "Dashboard", path: "/dashboard", icon: <TbLayoutDashboard className="sidebarIcon" /> },
        { name: "Users", path: "/users", icon: <CgUser className="sidebarIcon" /> },
        { name: "Reports", path: "/reports", icon: <MdOutlineBookmarkBorder className="sidebarIcon" /> },
        { name: "Community", path: "/community", icon: <IoChatbubblesOutline className="sidebarIcon" /> },
    ];

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarBrend">
                    <h1>Wellty</h1>
                </div>
                <div className="sidebarMenu">
                    <ul>
                        {/* 카테고리 동적 생성 */}
                        {categories.map((category, index) => (
                            <li key={index} className="sidebarItem" onClick={() => navigate(category.path)}>
                                {category.icon}
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;


// function Sidebar() {
//     const navigate = useNavigate();
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         axios.get("/api/categories")
//              .then(response => {
//                 setCategories(response.data);
//         })
//         .catch(error => {
//             console.error("연결 오류", error);
//         })
//     }, []);

//     return ( 
//         <div className="sidebar">
//             <div className="sidebarWrapper">
//                 <div className="sidebarBrend">
//                     <h1>Wellty</h1>
//                 </div>
//                 <div className="sidebarMenu">
//                     <ul>
//                         <li onClick={() => navigate("/")}>
//                             <TbBrandGoogleHome className="sidebarIcon" />
//                             Home
//                         </li>
//                         <li onClick={() => navigate("/dashboard")}>
//                             <TbLayoutDashboard className="sidebarIcon" />
//                             Dashboard
//                         </li>
//                         <li onClick={() => navigate("/users")}>
//                             <CgUser className="sidebarIcon" />
//                             Users
//                         </li>
//                         <li onClick={() => navigate("/reports")}>
//                             <MdOutlineBookmarkBorder  className="sidebarIcon" />
//                             Reports
//                         </li>
//                         <li onClick={() => navigate("/community")}>
//                             <IoChatbubblesOutline className="sidebarIcon" />
//                             Community
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Sidebar;