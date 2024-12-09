import React, { useEffect, useState } from 'react';
import './widgetcol.css';
import axios from 'axios';
import YouTube from 'react-youtube';

const WidgetCol = ({ keyword }) => {
    const [videos, setVideos] = useState([]); // 비디오 데이터를 상태로 저장
    const [error, setError] = useState(null); // 에러 상태 관리

    const fetchVideos = async () => {
        try {
            const response = await axios.get(`/api/youtube-search`, {
                params: { keyword }
            });

            setVideos(response.data); 
        } catch (err) {
            setError('YouTube API 요청 실패'); // 에러 처리
        }
    };

    useEffect(() => {
        if (keyword) {
            fetchVideos();
        }
    }, [keyword]);

    // 유튜브 플레이어 옵션
    const opts = {
        width: "100%",
        height: "150",
        playerVars: { 
            autoplay: 0,
            origin: "http://localhost:3000"
        },
    };

    return (
        <div className="widgetCol-container">
            <div className="widgetCol-title">관련 영상</div>
            {error && <div>{error}</div>}
            {/* 유튜브 비디오 리스트 */}
            <div className="videoList">
                {videos.map((item) => (
                    <div className="videoItem" key={item.videoId}>
                        <YouTube 
                            className="videoPlayer" 
                            videoId={item.videoId} 
                            opts={opts} 
                        />
                        <div className="videoTitle">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default WidgetCol;