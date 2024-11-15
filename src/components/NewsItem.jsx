import React, { useState } from 'react';

function NewsItem({ newsItem, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal visibility
  const [title, setTitle] = useState(newsItem.title); // News title
  const [imageSrc, setImageSrc] = useState(newsItem.imageSrc); // Initial image URL
  const [description, setDescription] = useState(newsItem.description); // News description

  // Functions to handle modal actions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    // Save updated information (could also involve API calls to save to a backend)
    closeModal();
  };

  const handleDelete = () => {
    onDelete(newsItem.id); // Call onDelete function passed from the parent to delete this news item
  };

  return (
    <div>
      <div className="card mb-3" style={{ maxWidth: "540px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={imageSrc} className="img-fluid rounded-start" alt="News" />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <button onClick={openModal} className="btn btn-primary me-2">Edit News</button>
              <button onClick={handleDelete} className="btn btn-danger">Delete News</button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit News Modal */}
      {isModalOpen && (
        <div className="modal" style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div className="modal-content" style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "5px",
            width: "500px"
          }}>
            <h5>Edit News</h5>
            <div className="form-group mb-3">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Image URL</label>
              <input
                type="text"
                className="form-control"
                value={imageSrc}
                onChange={(e) => setImageSrc(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button onClick={handleSave} className="btn btn-success me-2">Save</button>
            <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function NewsList() {
  const [newsItems, setNewsItems] = useState([
    { id: 1, title: "Card title 1", imageSrc: "image1.jpg", description: "Description 1" },
    { id: 2, title: "Card title 2", imageSrc: "image2.jpg", description: "Description 2" },
    { id: 3, title: "Card title 3", imageSrc: "image3.jpg", description: "Description 3" }
  ]);

  const handleDeleteNews = (id) => {
    setNewsItems(newsItems.filter(newsItem => newsItem.id !== id));
  };

  return (
    <div>
      {newsItems.map(newsItem => (
        <NewsItem key={newsItem.id} newsItem={newsItem} onDelete={handleDeleteNews} />
      ))}
    </div>
  );
}

export default NewsList;
