import React, { useState, useEffect } from "react";

export default function Home() {
  // Define image arrays with useState
  const [carouselImages, setCarouselImages] = useState([
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "/passport.jpg",
  ]);

  const profileImages = [
    "/passport.jpg",
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  ];

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false); // To track hover state

  useEffect(() => {
    // Set up intervals for the carousel images
    const carouselInterval = setInterval(() => {
      if (!isHovered) {
        setCurrentCarouselIndex(
          (prevIndex) => (prevIndex + 1) % carouselImages.length
        );
      }
    }, 1500); // Change every 1.5 seconds when not hovered

    // Set up intervals for the profile images
    const profileInterval = setInterval(() => {
      setCurrentProfileIndex(
        (prevIndex) => (prevIndex + 1) % profileImages.length
      );
    }, 3000); // Change every 3 seconds

    // Clear intervals on cleanup
    return () => {
      clearInterval(carouselInterval);
      clearInterval(profileInterval);
    };
  }, [carouselImages.length, isHovered]); // Depend on isHovered

  // Function to add a new image to the carousel
  const addImage = () => {
    const newImageSrc = prompt("Enter the URL of the new image:");
    if (newImageSrc) {
      setCarouselImages([...carouselImages, newImageSrc]); // Spread current images and add new image
      setCurrentCarouselIndex(carouselImages.length); // Update index to the new image
    }
  };

  // Function to delete the current image from the carousel
  const deleteImage = () => {
    if (carouselImages.length > 1) {
      const updatedImages = carouselImages.filter(
        (_, index) => index !== currentCarouselIndex
      );
      setCarouselImages(updatedImages);
      setCurrentCarouselIndex(
        currentCarouselIndex === 0 ? 0 : currentCarouselIndex - 1
      ); // Move to previous image if possible
    } else {
      alert("Cannot delete the only remaining image.");
    }
  };

  return (
    <div className="container">
      {/* Carousel Section */}
      <div className="row">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ maxHeight: "500px", position: "relative" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ height: "500px" }}>
              <img
                src={carouselImages[currentCarouselIndex]}
                className="d-block w-100"
                alt="Carousel Slide"
                style={{ height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Add and Delete buttons */}
          <button
            onClick={addImage}
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
            onMouseEnter={() => setIsHovered(true)} // Pause carousel on hover
            onMouseLeave={() => setIsHovered(false)} // Resume carousel on mouse leave
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
      </div>

      {/* Profile Image and Description Section */}
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center"
        style={{ padding: "1rem" }}
      >
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-3 mb-md-0 ">
          <img
            src={profileImages[currentProfileIndex]}
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

      {/* Additional Info Section */}
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center"
        style={{ padding: "1rem" }}
      >
        <div className="col-12 col-md-6">
          <p className="text-muted">
            Stay tuned for more updates on upcoming tournaments. Don’t miss the
            chance to compete and make memories in our grand sports events!
            <br />
            <a href="/">view more</a>
          </p>
        </div>
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-3 mb-md-0 ">
          <img
            src={profileImages[currentProfileIndex]}
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
      {/* Divider Line */}
      <hr
        style={{
          border: "none",
          borderTop: "3px solid #4a90e2",
          width: "80%",
          margin: "2rem auto",
        }}
      />
      {/* Profile Image and Description Section */}
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center"
        style={{ padding: "1rem" }}
      >
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-3 mb-md-0 ">
          <img
            src={profileImages[currentProfileIndex]}
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
    </div>
  );
}
