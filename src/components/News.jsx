import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);

  const handleCardClick = (news) => {
    setSelectedNews(news); // Set the selected news for the modal
    setViewModalVisible(true); // Show the modal
  };

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
        console.log("Fetched Data:", data); // Check the fetched data structure
        setNewsData(data.reverse());
        setFilteredNews(data.reverse()); // Initialize filtered news
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError(error.message || "Error fetching news");
        setIsLoading(false);
      });
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredNews(newsData);
    } else {
      setFilteredNews(
        newsData.filter(
          (news) =>
            news.sport_type &&
            news.sport_type.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const categories = ["all", "cricket", "hockey", "kabaddi", "basketball", "badminton"];

  return (
    <div className="container my-5">
      <h2 className="text-primary text-center mb-4">Latest News</h2>

      {/* Center Filter Options */}
      <div
        className="d-flex justify-content-center align-items-center mb-4"
        style={{
          height: "10vh", // Adjust height to position in the middle
          gap: "10px",
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            className={`btn btn-sm ${
              selectedCategory === category ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleFilterChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Display the number of results found */}
      <p className="text-muted text-center">
        {filteredNews.length} {filteredNews.length === 1 ? "result" : "results"} found.
      </p>

      {isLoading ? (
        <p>Loading news...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : filteredNews.length > 0 ? (
        <div className="row">
          {filteredNews.map((news) => (
            <div className="col-md-4 mb-4" key={news._id}>
              <div className="card h-100 shadow-sm"style={{
                        width: "600px",
                        height: "600px",
                      }}>
                <div className="row g-0">
                  {/* Image on one side */}
                  <div className="col-5" onClick={() => handleCardClick(news)}>
                    <img
                      src={news.news_image_url || "./rgukt_logo.png"}
                      alt={news.title}
                      className="img-fluid rounded-start"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: "5px",
                        borderBottomLeftRadius: "5px",
                      }}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>

                  {/* Title and description on the other side */}
                  <div className="col-7">
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{news.title}</h5>
                      <p
                        className="card-text text-muted"
                        style={{
                          maxHeight: "3rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {news.news_content}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No news available.</p>
      )}

      {/* Modal for news details */}
      <Modal
        show={viewModalVisible}
        onHide={() => setViewModalVisible(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedNews?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={selectedNews?.news_image_url || "./rgukt_logo.png"}
            alt={selectedNews?.title}
            style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            onError={(e) => (e.target.src = "https://via.placeholder.com/600x400")}
          />
          <p className="mt-3" style={{ fontSize: "18px" }}>
            {selectedNews?.news_content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
