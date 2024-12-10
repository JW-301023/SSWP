import React, { useEffect, useState } from "react";
import axios from "axios";
import './reports.css';

const Reports = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/articles")
      .then((response) => {
        console.log("크롤링 데이터:", response.data);
        setArticles(response.data)
    })
    .catch((error) => console.error("Error fetching articles:", error));
  }, []);

  return (
    <div className="reports">
        <div className="reports-title">
            <h1>Wellness Articles</h1>
            <p>with Vogue</p>
        </div>
        <div className="reports-container">
            {articles.map((article, index) => (
                <div key={index}>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                        <img src={article.imageUrl} alt={article.title} className="report-image" />
                        <div className="report-content">
                            <h3>{article.title}</h3>
                            <p>{article.date}</p>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    </div>
  );
};

export default Reports;
