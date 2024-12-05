import React, { useEffect, useState } from 'react';
import './widgetCol.css';
import axios from 'axios';
import YouTube from 'react-youtube';
import { Row, Col } from 'react-bootstrap';

const WidgetCol = ({ keyword }) => {
    const [videos, setVideos] = useState([]); // 비디오 데이터를 상태로 저장
    const [error, setError] = useState(null); // 에러 상태 관리

    // 1
    // const API_KEY = 'AIzaSyDWDPSZsSUklHUWUK5kPa8o2EitLejwcEQ';

    // 2
    const API_KEY = 'AIzaSyDYZbvQhP7gQhKIcoExrBJcyJFELWG7w2I'
    const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';


    const fetchVideos = async () => {
        setError(null); 

        try {
            const response = await axios.get(BASE_URL, {
              params: {
                key: API_KEY, 
                q: keyword, 
                part: 'snippet',
                type: 'video', 
                maxResults: 5, 
                fields: 'items(id,snippet(title))', 
                videoEmbeddable: true, 
              },
            });

            // API 응답 데이터 가공
            const searchedVideos = getSearchedVideos(response.data.items);

            setVideos(searchedVideos); // 가공된 비디오 데이터 상태에 저장
        } catch (err) {
            setError('YouTube API 요청 실패'); // 에러 처리
        }
    };

    // 응답된 데이터를 가공하는 함수
    const getSearchedVideos = (videoLists) => {
        const searchedVideos = [];
        videoLists.forEach((element) => {
            const videoId = element.id.videoId;
            const title = element.snippet.title;
            searchedVideos.push({ videoId, title });
        });
        return searchedVideos;
    };

    useEffect(() => {
        if (keyword) {
        fetchVideos();
        }
    }, [keyword]);

    // 유튜브 플레이어 옵션
    const opts = {
        width: "250",
        height: "150",
        playerVars: {
            autoplay: 0, // 자동 재생을 비활성화
        },
    };

    return (
        <div className="widgetCol-container">
            <div className="widgetCol-title">관련 영상</div>
            {error && <div>{error}</div>}

            {/* 유튜브 비디오 리스트 */}
                <div className="centeral">
                    <div className="videoList">
                        {videos.map((item) => (
                            <Col key={item.videoId}>
                                <Row className="videoItem">
                                    {/* 유튜브 비디오 플레이어 */}
                                    <div className="youtubePlayer">
                                        <YouTube className="videoPlayer" videoId={item.videoId} opts={opts} />
                                    </div>
                                    <div className="videoTitle">
                                        {item.title.replace(/&QUOT;/gi, '"')}
                                    </div>
                                </Row>
                            </Col>
                        ))}
                    </div>
                </div>
            </div>
    )
}

export default WidgetCol;