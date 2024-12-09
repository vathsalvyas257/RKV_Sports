import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function AdminNews({ setAlert, fetchNews }) {
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEditNews, setCurrentEditNews] = useState(null);

  // Fetch all news and display latest first
  const fetchAllNews = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/News/");
      const data = await response.json();
      if (response.ok) {
        // Reverse the order to show latest created news first
        setAllNews(data.reverse());
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

  const updateNews = async () => {
    if (!currentEditNews) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/News/?title=${encodeURIComponent(
          currentEditNews.title
        )}&news_content=${encodeURIComponent(currentEditNews.news_content)}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update news.");
      }

      const data = await response.json();
      setAllNews((prevNews) =>
        prevNews.map((news) =>
          news.title === currentEditNews.title
            ? { ...news, news_content: currentEditNews.news_content }
            : news
        )
      );
      setAlert(data.message || "News updated successfully.", "success");
    } catch (error) {
      console.error("Error updating news:", error);
      setAlert(error.message, "danger");
    } finally {
      setEditModalVisible(false);
    }
  };

  const deleteNews = async (title) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/News/?title=${title}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        setAllNews((prevNews) => prevNews.filter((news) => news.title !== title));
        const data = await response.json();
        setAlert(data.message, "success");
      } else {
        setAlert("Failed to delete the news.", "danger");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      setAlert("Error deleting news. Please try again later.", "danger");
    }
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  return (
    <div className="mt-4">
      <h3 className="text-primary mb-3">Latest News</h3>
      <div
        className="d-flex"
        style={{
          overflowX: "auto",
          maxWidth: "100%",
          padding: "10px",
          gap: "20px",
          scrollSnapType: "x mandatory",
          msOverflowStyle: "none",
          scrollbarWidth: "none",
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
                minWidth: "350px",
                flexShrink: 0,
                scrollSnapAlign: "start",
                display: "flex",
                flexDirection: "row",
                height: "250px",
                alignItems: "center",
              }}
            >
              <img
                src={news.news_image || "./rgukt_logo.png"}
                className="card-img-left"
                alt={news.title}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
              />
              <div className="card-body" style={{ paddingLeft: "15px" }}>
                <h5 className="card-title" style={{ fontSize: "18px" }}>
                  {news.title}
                </h5>
                {news.category && (
                  <div className="badge bg-secondary mb-2" style={{ fontSize: "12px" }}>
                    {news.category}
                  </div>
                )}
                <p
                  className="card-text"
                  style={{
                    fontSize: "14px",
                    color: "#555",
                    height: "80px",
                    overflow: "hidden",
                  }}
                >
                  {news.news_content}
                </p>
                <div className="mt-3">
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
          <div>No news available</div>
        )}
      </div>

      <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              value={currentEditNews?.title || ""}
              onChange={(e) =>
                setCurrentEditNews({
                  ...currentEditNews,
                  title: e.target.value,
                })
              }
              className="form-control mb-3"
            />
            <textarea
              value={currentEditNews?.news_content || ""}
              onChange={(e) =>
                setCurrentEditNews({
                  ...currentEditNews,
                  news_content: e.target.value,
                })
              }
              className="form-control"
              rows="5"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalVisible(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={updateNews}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
