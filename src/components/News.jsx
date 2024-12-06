import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch news data from the backend API
    fetch('http://127.0.0.1:8000/News/')
      .then(response => response.json())
      .then(data => {
        setNewsData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        setIsLoading(false);
      });
  }, []);

  // Group news by sport type
  const groupedNews = newsData.reduce((acc, news) => {
    acc[news.sport_type] = acc[news.sport_type] || [];
    acc[news.sport_type].push(news);
    return acc;
  }, {});

  const handleDeleteNews = (id) => {
    // Delete news item by id
    fetch(`http://127.0.0.1:8000/News/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
      setNewsData(newsData.filter(news => news._id !== id)); // Remove the deleted item from state
    })
    .catch(error => console.error('Error deleting news:', error));
  };

  const handleUpdateNews = (updatedNewsItem) => {
    // Update news item
    fetch(`http://127.0.0.1:8000/News/${updatedNewsItem._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedNewsItem),
    })
    .then(response => response.json())
    .then(data => {
      setNewsData(newsData.map(news => (news._id === data._id ? data : news)));
    })
    .catch(error => console.error('Error updating news:', error));
  };

  return (
    <div className="container my-5">
      {isLoading ? (
        <p>Loading news...</p>
      ) : (
        Object.entries(groupedNews).map(([sport, newsItems]) => (
          <div key={sport}>
            <h2>{sport.charAt(0).toUpperCase() + sport.slice(1)}</h2>
            <div className="row mb-4">
              {newsItems.map(news => (
                <div className="col-md-6 mb-4" key={news._id}>
                  <NewsItem
                    news={news}
                    onDelete={handleDeleteNews}
                    onUpdate={handleUpdateNews} // Pass onUpdate function to handle saving updated news
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
