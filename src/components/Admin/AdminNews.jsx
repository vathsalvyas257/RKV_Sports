import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

export default function AdminNews({ newsList, setNewsList }) {
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [currentEditNews, setCurrentEditNews] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const [newNews, setNewNews] = useState({
    title: "",
    news_content: "",
    news_image_url: "",
  });

  const handleCardClick = (news) => {
    setSelectedNews(news); // Set the selected news for the modal
    setViewModalVisible(true); // Show the modal
  };
  

  // Fetch all news and display latest first
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/News/"); // API endpoint to fetch news
        const data = await response.json();

        if (response.ok) {
          // Sort the news by the created_at field in descending order
          const sortedNews = data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setNewsList(sortedNews); // Update the newsList with sorted news
        } else {
          toast.error("Failed to fetch news.");
        }

        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        toast.error("Error fetching news.");
        setLoading(false);
      }
    };

    fetchNews(); // Fetch news when the component mounts
  });

  // Create News
  const createNews = async () => {
    if (!newNews.title || !newNews.news_content) {
      toast.error("Title and content are required!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/News/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNews),
      });

      if (response.ok) {
        const createdNewsItem = await response.json();

        // Show success toast
        toast.success("News created successfully!");

        // Add the newly created news item to the front of the array (latest first)
        setNewsList((prevNews) => [createdNewsItem, ...prevNews]);

        // Close modal and reset form
        setCreateModalVisible(false);
        setNewNews({
          title: "",
          news_content: "",
          news_image_url: "",
        });
      } else {
        toast.error("Error creating news.");
      }
    } catch (error) {
      toast.error("Error creating news.");
    }
  };

  // Edit News
  const updateNews = async () => {
    if (!currentEditNews.title || !currentEditNews.news_content) {
      toast.error("Title and content are required!");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/News/?title=${encodeURIComponent(
          currentEditNews.title
        )}&news_content=${encodeURIComponent(currentEditNews.news_content)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update the news in the list
        setNewsList((prevNews) => {
          return prevNews.map((newsItem) =>
            newsItem.title === currentEditNews.title
              ? currentEditNews
              : newsItem
          );
        });

        // Show success toast
        toast.success("News updated successfully!");

        // Close the modal
        setEditModalVisible(false);
        setCurrentEditNews(null);
      } else {
        toast.error("Error updating news.");
      }
    } catch (error) {
      toast.error("Error updating news.");
    }
  };

  // Delete News
  const deleteNews = async (title) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/News/?title=${encodeURIComponent(title)}`,
        {
          method: "DELETE", // Assuming your backend supports DELETE method for removing news
        }
      );

      if (response.ok) {
        toast.success("News deleted successfully!");
        setNewsList((prevNews) =>
          prevNews.filter((news) => news.title !== title)
        ); // Remove the deleted news from the list
      } else {
        toast.error("Error deleting news.");
      }
    } catch (error) {
      toast.error("Error deleting news.");
    }
  };

  return (
    <div className="mt-4">
      <div
        className="d-flex"
        style={{
          overflowX: "auto", // Horizontal scrolling
          padding: "10px",
          gap: "20px",
          scrollSnapType: "x mandatory", // Ensures snap to individual cards
          msOverflowStyle: "none", // Hide scrollbar in IE
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          flexWrap: "nowrap", // Prevent wrapping of cards
          marginBottom: "20px",
        }}
      >
        {loading ? (
          <div>Loading...</div>
        ) : newsList.length > 0 ? (
          newsList
            .slice() // Create a shallow copy of the array to avoid modifying the original list
            .reverse() // Reverse the array to display latest items first
            .map((news) => (
              <div
                onDoubleClick={() => handleCardClick(news)}
                key={news._id}
                className="card shadow-sm border-0"
                style={{
                  minWidth: "300px",
                  flexShrink: 0,
                  scrollSnapAlign: "start", // Cards snap to the start
                  display: "flex",
                  flexDirection: "row",
                  height: "250px",
                  width: "500px",
                  alignItems: "center",
                }}
              >
                <img
                  src={news.news_image_url || "./rgukt_logo.png"}
                  className="card-img-left"
                  alt={news.title}
                  style={{
                    width: "220px",
                    height: "180px",
                    objectFit: "cover",
                  }}
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/150")
                  }
                />
                <div className="card-body" style={{ paddingLeft: "15px" }}>
                  <h5 className="card-title " style={{ fontSize: "28px" }}>
                    {news.title}
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      fontSize: "18px",
                      color: "#555",
                      height: "150px",
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
      {/* Edit News Modal */}
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
          <Button
            variant="secondary"
            onClick={() => setEditModalVisible(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={updateNews}>
            Update News
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Create News Modal */}
      <Modal
        show={createModalVisible}
        onHide={() => setCreateModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create News</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={newNews.title}
              onChange={(e) =>
                setNewNews({ ...newNews, title: e.target.value })
              }
              className="form-control mb-3"
            />
            <textarea
              placeholder="Content"
              value={newNews.news_content}
              onChange={(e) =>
                setNewNews({ ...newNews, news_content: e.target.value })
              }
              className="form-control"
              rows="5"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setCreateModalVisible(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={createNews}>
            Create News
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //modal for viewing the news in detail */}
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
            onError={(e) =>
              (e.target.src = "https://via.placeholder.com/600x400")
            }
          />
          <p className="mt-3" style={{ fontSize: "18px" }}>
            {selectedNews?.news_content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setViewModalVisible(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
