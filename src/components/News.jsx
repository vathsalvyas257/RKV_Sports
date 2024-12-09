import React, { useEffect, useState } from "react";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // Store selected category

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
        setNewsData(data.reverse()); // Reverse the fetched news data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setError(error.message || "Error fetching news");
        setIsLoading(false);
      });
  }, []);

  // Filter news based on the selected category (sport type)
  const filteredNews = selectedCategory
    ? newsData.filter((news) => news.sport_type.toLowerCase() === selectedCategory.toLowerCase())
    : newsData;

  // Predefined categories for filtering
  const categories = [
    "All Sports", "Cricket", "Hockey", "Kabaddi", "Basketball", "Badminton"
  ];

  return (
    <div className="container my-5">
      {/* Filter Bar */}
      <div className="d-flex justify-content-center align-items-center mb-4" style={{ padding: "12px 30px", borderRadius: "25px" }}>
        <label htmlFor="category-select" className="form-label me-3" style={{ fontSize: "1.1rem", marginBottom: 0 }}>
          Filter by Sports:
        </label>
        <select
          id="category-select"
          className="form-select form-select-lg w-auto"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            fontSize: "1.1rem",
            padding: "0.6rem",
            borderRadius: "20px",
            borderColor: "#4CAF50", // Green border color
            boxShadow: "none", // Remove shadow to keep it clean
          }}
        >
          <option value="">All Sports</option>
          {categories.slice(1).map((category, index) => (
            <option key={index} value={category.toLowerCase()}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Display the number of results found */}
      <p className="text-muted">
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
              <div className="card h-100 shadow-sm">
                <div className="row g-0">
                  {/* Image on one side */}
                  <div className="col-5">
                    <img
                      src={news.news_image || "./rgukt_logo.png"}
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
                        console.log("Error loading image:", e.target.src);
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
        <p>No news available.</p>
      )}
    </div>
  );
}
