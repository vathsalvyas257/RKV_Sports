import React, { useContext, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import SportsContext from "./context/SportsContext";

export default function Home() {
  const {carouselImages,addCarouselImage}=useContext(SportsContext);
  console.log(carouselImages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageId, setImageId] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setImageId("");
    setUploadedImage(null);
  };

  const handleAddImage = () => {
    if (imageId && uploadedImage) {
      addCarouselImage({imageId,uploadedImage})
      setCarouselImages([
        ...carouselImages,
        { id: imageId, src: uploadedImage },
      ]);
      closeModal();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Convert file to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    if (carouselImages.length > 1) {
      setCarouselImages((images) => images.slice(0, images.length - 1));
    } else {
      alert("Cannot delete the only remaining image.");
    }
  };

  return (
    <div style={{ margin: 0, padding: 0, overflowX: "hidden" }}>
      {/* Full-Width Carousel Section */}
      <div style={{ width: "100vw", overflow: "hidden" }}>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          interval={3000}
          transitionTime={700}
          stopOnHover
          swipeable
          showStatus={false}
          dynamicHeight={false}
        >
          {carouselImages.map((image) => (
            <div key={image.id} style={{ width: "100vw" }}>
              <img
                src={image.banner_link}
                alt={`Slide ${image.id}`}
                style={{
                  width: "100vw",
                  height: "500px",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Carousel>

        <button
          onClick={openModal}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "60px",
            zIndex: 1000,
          }}
          className="btn btn-primary"
        >
          Add Image
        </button>
        <button
          onClick={deleteImage}
          style={{
            position: "absolute",
            bottom: "10px",
            left: "60px",
            zIndex: 1000,
          }}
          className="btn btn-danger"
        >
          Delete Image
        </button>
      </div>

      {/* Centered Modal for Adding New Images */}
      {isModalOpen && (
        <div className="modal-overlay" style={styles.modalOverlay}>
          <div className="modal-content" style={styles.modalContent}>
            <button onClick={closeModal} style={styles.closeButton}>
              X
            </button>

            <h3>Add New Image</h3>

            <div style={{ marginBottom: "1rem" }}>
              <label>Image ID:</label>
              <input
                type="text"
                placeholder="Enter image ID"
                value={imageId}
                onChange={(e) => setImageId(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={{ marginBottom: "1rem" }}>
              <label>Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={styles.input}
              />
            </div>

            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="Preview"
                className="preview"
                style={styles.preview}
              />
            )}

            <button
              onClick={handleAddImage}
              disabled={!imageId || !uploadedImage}
              style={styles.addButton}
            >
              Add Image
            </button>
          </div>
        </div>
      )}

      {/* Profile Image and Description Section */}
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center"
        style={{ padding: "1rem" }}
      >
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-3 mb-md-0 ">
          <img
            src="/passport.jpg"
            className="card-img-top"
            alt="Profile"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              margin: "1rem auto",
              borderRadius: "30px",
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <p className="text-muted">
            This is the brief description about the tournament. Join us for an
            exciting tournament filled with action and enthusiasm. Compete,
            showcase your skills, and be a part of this thrilling sports event!
            <br />
            <a href="/">view more</a>
          </p>
        </div>
      </div>

      {/* Divider Line */}
      <hr
        style={{
          border: "none",
          borderTop: "3px solid #4a90e2",
          width: "80%",
          margin: "2rem auto",
        }}
      />
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center"
        style={{ padding: "1rem" }}
      >
        <div className="col-12 col-md-6">
          <p className="text-muted">
            This is the brief description about the tournament. Join us for an
            exciting tournament filled with action and enthusiasm. Compete,
            showcase your skills, and be a part of this thrilling sports event!
            <br />
            <a href="/">view more</a>
          </p>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-3 mb-md-0 ">
          <img
            src="/passport.jpg"
            className="card-img-top"
            alt="Profile"
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              margin: "1rem auto",
              borderRadius: "30px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    width: "400px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "8px",
    textAlign: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  preview: {
    width: "100px",
    height: "100px",
    marginTop: "10px",
  },
  addButton: {
    padding: "10px 20px",
    backgroundColor: "#4a90e2",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "15px",
  },
};
