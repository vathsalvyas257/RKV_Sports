import React, { useEffect, useState } from "react";

export default function News() {
  const [newsData, setNewsData] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
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
              <div className="card h-100 shadow-sm">
                <div className="row g-0">
                  {/* Image on one side */}
                  {console.log(news.news_image_url)}
                  <div className="col-5">
                    <img
                      src={news.news_image || "./rgukt_logo.png"} // Fallback image
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
        <p className="text-center">No news available.</p>
      )}
    </div>
  );
}
