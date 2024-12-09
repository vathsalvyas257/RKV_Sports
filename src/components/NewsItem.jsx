import React, { useState } from 'react';

function NewsItem({ news, onDelete, onUpdate }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // To toggle modal visibility
  const [title, setTitle] = useState(news.title); // News title
  const [imageSrc, setImageSrc] = useState(news.news_image_url); // Image URL
  const [description, setDescription] = useState(news.news_content); // News content

  // Functions to handle modal actions
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = () => {
    const updatedNews = {
      ...news,
      title,
      news_image_url: imageSrc,
      news_content: description,
    };
    onUpdate(updatedNews); // Update the news item
    closeModal(); // Close the modal
  };

  const handleDelete = () => {
    onDelete(news._id); // Call onDelete function passed from the parent to delete this news item
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="row g-0">
        {/* Image on one side */}
        <div className="col-md-4">
          <img
            src={imageSrc || 'https://via.placeholder.com/150'}
            className="img-fluid rounded-start"
            alt="News"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderTopLeftRadius: '5px',
              borderBottomLeftRadius: '5px',
            }}
          />
        </div>

        {/* Title, Description, and Actions */}
        <div className="col-md-8">
          <div className="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 className="card-title">{title}</h5>
              <p className="card-text text-muted" style={{ maxHeight: '4rem', overflow: 'hidden' }}>
                {description}
              </p>
            </div>
            <div className="d-flex">
              <button onClick={openModal} className="btn btn-primary me-2">
                Edit News
              </button>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete News
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit News Modal */}
      {isModalOpen && (
        <div
          className="modal"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              width: '500px',
            }}
          >
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
            <button onClick={handleSave} className="btn btn-success me-2">
              Save
            </button>
            <button onClick={closeModal} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsItem;
