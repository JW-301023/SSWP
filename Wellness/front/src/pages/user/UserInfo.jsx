import React, { useState, useEffect } from "react";
import axios from "axios";
import './userinfo.css'

// 회원 정보 화면//
export default function UserInfo() {
    const userid = localStorage.getItem('userid'); // 저장된 사용자 ID 가져오기
    const [posts, setPosts] = useState([]); // 사용자가 작성한 게시글
    const [comments, setComments] = useState([]); // 사용자가 작성한 댓글
    const [activeTab, setActiveTab] = useState("posts"); // 활성화된 탭 상태

    useEffect(() => {
        const fetchUserContent = async () => {
            try {
                // 내가 쓴 게시글 가져오기
                const postResponse = await axios.get(`/api/posts/user/${userid}`);
                setPosts(postResponse.data);

                // 내가 쓴 댓글 가져오기
                const commentResponse = await axios.get(`/api/comments/user/${userid}`);
                setComments(commentResponse.data);
            } catch (error) {
                console.error("사용자 데이터 불러오기 실패:", error);
            }
        };

        fetchUserContent();
    }, [userid]);

    const handleLogout = () => {
        localStorage.removeItem('userid'); // 로그아웃 시 로컬 스토리지에서 사용자 정보 제거
        window.location.href = '/users'; // 로그인 화면으로 이동
    };

    return (
        <div className="user-info">
            <h1>{userid}님 Info</h1>
            <p> Welcome😉 {userid}님</p>
            <div className="tabs">
                <span
                    className={`tab ${activeTab === "posts" ? "active" : ""}`}
                    onClick={() => setActiveTab("posts")}
                >
                    내 게시글
                </span>
                <span
                    className={`tab ${activeTab === "comments" ? "active" : ""}`}
                    onClick={() => setActiveTab("comments")}
                >
                    댓글 단 글
                </span>
            </div>

            {activeTab === "posts" && (
                <div className="userinfo-content">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="item">
                                <h3>{post.title}</h3>
                                <p>{post.createdAt}</p>
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <p>등록한 게시글이 없습니다.</p>
                        </div>
                    )}
                </div>
            )}

            {activeTab === "comments" && (
                <div className="userinfo-content">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div key={comment.id} className="item">
                                <p>{comment.content}</p>
                                <span>{comment.createdAt}</span>
                            </div>
                        ))
                    ) : (
                        <div className="empty">
                            <p>등록한 댓글이 없습니다. 지금 바로 새로운 댓글을 등록해보세요!</p>
                        </div>
                    )}
                </div>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
