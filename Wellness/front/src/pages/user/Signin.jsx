// import React, { useState } from "react";
// import './auth.css'
// import Login from "./Login";
// import Signup from "./Signup";
// import Overlay from "./Overlay";

// const Signin = () => {
//     const [rightPanelActive, setRightPanelActive] = useState(false);

//     // 회원가입 화면 활성화
//     const handleClickSignUpButton = () => {
//         setRightPanelActive(true);
//     };

//     // 로그인 화면 활성화
//     const handleClickSignInButton = () => {
//         setRightPanelActive(false);
//     };

//     return (
//         <div className="signin-container">
//             <div 
//                 className={`container ${rightPanelActive ? 'right-panel-active' : ''}`}
//                 id="container"
//             >
//                 {/* 회원가입 컴포넌트 */}
//                 <Signup />

//                 {/* 로그인 컴포넌트 */}
//                 <Login />

//                 {/* 오버레이 컴포넌트 */}
//                 <Overlay
//                     handleClickSignInButton={handleClickSignInButton}
//                     handleClickSignUpButton={handleClickSignUpButton}
//                 />
//             </div>
//         </div>
//     )
// }

// export default Signin;