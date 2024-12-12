import React, { useEffect, useState } from "react";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch news data from the backend API
    fetch("http://127.0.0.1:8000/News/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No News Found.");
        }
        return response.json();
      })
      .then((data) => {
        setNewsData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError(error.message || "Error fetching news");
        setIsLoading(false);
      });
  }, []);

  // Group news by sport type
  const groupedNews = newsData.reduce((acc, news) => {
    acc[news.sport_type] = acc[news.sport_type] || [];
    acc[news.sport_type].push(news);
    return acc;
  }, {});

  return (
    <div className="container my-5">
      {isLoading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : newsData.length > 0 ? (
        Object.entries(groupedNews).map(([sport, newsItems]) => (
          <div key={sport}>
            <h2 className="text-primary mb-3">
              {sport.charAt(0).toUpperCase() + sport.slice(1)}
            </h2>
            <div className="row mb-4">
              {newsItems.map((news) => (
                <div className="col-md-6 mb-4" key={news._id}>
                  <div className="card shadow-sm border-0">
                    <img
                      src={news.news_image_url || "./rgukt_logo.png"} // Fallback image
                      alt={news.title}
                      className="card-img-top"
                      style={{ height: "200px", objectFit: "cover" }}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150")
                      }
                    />
                    <div className="card-body">
                      <h5 className="card-title">{news.title}</h5>
                      <p className="card-text text-secondary">
                        {news.news_content}
                      </p>
                      {news.category && (
                        <span className="badge bg-secondary">
                          {news.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No news available.</p>
      )}
    </div>
  );
}
