import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AdminNews({ setAlert }) {
  const [allNews, setAllNews] = useState([]); // To store all news
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false); // Modal to create news
  const [currentEditNews, setCurrentEditNews] = useState(null);
  const [newNews, setNewNews] = useState({
    title: "",
    news_content: "",
    news_image: "",
    category: "",
  });

  // Fetch the latest news from the API
  const fetchNews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/News/");
      const data = await response.json();
      if (response.ok) {
        setAllNews(data.slice(0, 5).reverse()); // Limit to latest 5 and reverse the order
      } else {
        setAlert("No news found.", "warning");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setAlert("Error fetching news. Please try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  // Function to create news
  const createNews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/News/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNews),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create news.");
      }

      const data = await response.json();
      setAllNews((prevNews) => [newNews, ...prevNews]);
      setAlert("News created successfully.", "success");
      setCreateModalVisible(false); // Close the modal after successful creation
      setNewNews({ title: "", news_content: "", news_image: "", category: "" }); // Clear form data
    } catch (error) {
      console.error("Error creating news:", error);
      setAlert(error.message, "danger"); // Use the error message from the backend
    }
  };

  const deleteNews = async (title) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/News/?title=${title}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        setAllNews((prevNews) => prevNews.filter((news) => news.title !== title));
        setAlert(data.message, "success");
      } else {
        setAlert("Failed to delete the news.", "danger");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      setAlert("Error deleting news. Please try again later.", "danger");
    }
  };

  const updateNews = async (updatedNews) => {
    const { title, news_content } = updatedNews;
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/News/?title=${title}&news_content=${news_content}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAllNews((prevNews) =>
          prevNews.map((news) =>
            news.title === title ? { ...news, news_content } : news
          )
        );
        setAlert("News updated successfully.", "success");
      } else {
        setAlert("Failed to update the news.", "danger");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      setAlert("Error updating news. Please try again later.", "danger");
    } finally {
      setEditModalVisible(false);
    }
  };

  useEffect(() => {
    fetchNews(); // Fetch news when the component loads
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-primary mb-3">Latest News</h3>

      {/* Horizontal News Section */}
      <div
        className="d-flex"
        style={{
          overflowX: "auto", // Allows horizontal scrolling
          maxWidth: "100%",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : allNews.length > 0 ? (
          allNews.map((news, index) => (
            <div
              key={index}
              className="card shadow-sm border-0 mb-4"
              style={{
                width: "350px", // Increased width for each card
                marginLeft: "20px",
                display: "flex",
                flexDirection: "row", // Flex to align items horizontally
                height: "250px", // Increased height for consistency
                alignItems: "center", // Vertically center the content
              }}
            >
              {/* Image on the left */}
              <img
                src={news.news_image || "./rgukt_logo.png"} // Fallback image
                className="card-img-left"
                alt={news.title}
                style={{
                  width: "120px", // Increased image width
                  height: "120px", // Increased image height
                  objectFit: "cover", // Maintain aspect ratio of image
                }}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/150")
                } // Fallback image on error
              />

              {/* Content on the right */}
              <div className="card-body" style={{ paddingLeft: "15px" }}>
                <h5 className="card-title" style={{ fontSize: "18px" }}>
                  {news.title}
                </h5>
                <p
                  className="card-text"
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    height: "80px", // Increased height of the description
                    overflow: "hidden", // Hide overflow content
                  }}
                >
                  {news.news_content}
                </p>
                {/* Display Sports Category */}
                {news.category && (
                  <div
                    className="badge bg-secondary"
                    style={{ fontSize: "12px" }}
                  >
                    {news.category}
                  </div>
                )}
                <div className="mt-3">
                  {/* Edit and Delete Buttons */}
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => {
                      setCurrentEditNews(news);
                      setEditModalVisible(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteNews(news.title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No news available.</div>
        )}
      </div>

      {/* Create News Modal */}
      {createModalVisible && (
        <Modal
          show={createModalVisible}
          onHide={() => setCreateModalVisible(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create News</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createNews();
              }}
            >
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={newNews.title}
                  onChange={(e) =>
                    setNewNews({ ...newNews, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newNews.news_content}
                  onChange={(e) =>
                    setNewNews({ ...newNews, news_content: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="text"
                  className="form-control"
                  value={newNews.news_image}
                  onChange={(e) =>
                    setNewNews({ ...newNews, news_image: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={newNews.category}
                  onChange={(e) =>
                    setNewNews({ ...newNews, category: e.target.value })
                  }
                />
              </div>
              <div className="d-flex justify-content-between">
                <Button
                  variant="secondary"
                  onClick={() => setCreateModalVisible(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Create News
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
