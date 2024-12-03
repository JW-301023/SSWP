import React, { useState } from "react";
import axios from "axios";
import "./createpost.css";
import {useNavigate} from "react-router-dom";

const CreatePost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("Physical");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const name = localStorage.getItem("userid"); // 로그인된 사용자 ID
        if (!name) {
            alert("로그인이 필요합니다.");
            navigate(`/login`, { state: { from: "/create" } }); // 로그인 화면으로 이동 시 이전 위치 전달
            return;
        }

        // 제목과 내용 유효성 검사
        if (!title.trim()) {
            alert("제목을 입력해주세요!");
            return;
        }
        if (!content.trim()) {
            alert("내용을 입력해주세요!");
            return;
        }

        const post = { title, content, category, name }; // name을 로그인된 사용자로 설정
        try {
            await axios.post("/api/posts/create", post);
            alert("작성 성공!");
            navigate('/community');
        } catch (error) {
            alert("게시글 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="create-post-container">
            <h2>Write Your Thoughts</h2>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="Physical">Physical</option>
                <option value="Social">Social</option>
                <option value="Mental">Mental</option>
                <option value="Emotional">Emotional</option>
                <option value="Environmental">Environmental</option>
            </select>
            <input
                type="text"
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default CreatePost;
