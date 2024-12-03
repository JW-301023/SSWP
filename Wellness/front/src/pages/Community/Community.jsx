import React, { useState, useEffect } from "react";
import axios from "axios";
import "./community.css";
import {useNavigate} from "react-router-dom";

const Community = () => {
    const [posts, setPosts] = useState([]); // 게시물 데이터 저장 및 관리 데이터
    const [category, setCategory] = useState("ALL"); // 선택된 카테고리 (초기값(ALL)
    const [searchTerm, setSearchTerm] = useState(""); // 검색어 (초기값 빈 문자열)
    const navigate = useNavigate();

    // 게시물 데이터 가져오기
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    category === "ALL" // "ALL"이면 모든 게시글 가져오기
                        ? "/api/posts" // 모든 게시글 엔드포인트
                        : `/api/posts/category/${category}` // 특정 카테고리 게시글 엔드포인트
                );
                setPosts(response.data);
            } catch (error) {
                console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
            }
        };
        fetchPosts();
    }, [category]);

    // 검색 기능
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert("검색어를 입력하세요!");
            return;
        }
        try {
            const encodedSearchTerm = encodeURIComponent(searchTerm.trim()); // 검색어를 URL에 적합한 형태로 변환
            const response = await axios.get(`/api/posts/search?keyword=${encodedSearchTerm}`);
            console.log("검색 결과:", response.data); // 디버깅용
            setPosts(response.data);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    };

    // Enter 키를 눌렀을 때 검색 실행
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="community-container">
            <div className="community-header">
                <h1>Wellty</h1>

                {/* 카테고리 필터 */}
                <div className="category-filter">
                    {["ALL", "Physical", "Social", "Mental", "Emotional", "Environmental"].map((cat, index) => (
                        <span
                            key={index}
                            className={`category-item ${category === cat ? "active" : ""}`}
                            onClick={() => setCategory(cat)}
                        >
                {cat}
                        </span>
                    ))}
                </div>
                {/* 검색창 */}
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyPress} // Enter 키 이벤트 추가
                    />
                    <button onClick={handleSearch}>🔍</button>
                </div>

                {/* 게시물 테이블 */}
                <table className="post-table">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Category</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Views</th>
                        <th> ♥️ </th>
                    </tr>
                    </thead>
                    <tbody>
                    {posts.map((post, index) => (
                        <tr key={post.id} onClick={() => navigate(`/community/${post.id}`, { state: { category } })}>
                            <td>{index + 1}</td>
                            <td>{post.category}</td>
                            <td>{post.title}</td>
                            <td>{post.name}</td>
                            <td>{post.createdAt}</td>
                            <td>{post.views}</td>
                            <td>{post.likes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* 글쓰기 버튼 */}
                <div className="write-button-container">
                    <button className="write-button" onClick={() => navigate("/create")}>
                        Click your thoughts
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Community;
