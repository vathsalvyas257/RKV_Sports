import React, { useContext, useState } from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

export default function Home() {
  const [carouselImages, setCarouselImages] = useState([
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    "/passport.jpg",
  ]);

  const profileImages = [
    "/passport.jpg",
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  ];

  const addImage = () => {
    const newImageSrc = prompt("Enter the URL of the new image:");
    if (newImageSrc) {
      setCarouselImages([...carouselImages, newImageSrc]);
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
          {carouselImages.map((image, index) => (
            <div key={index} style={{ width: "100vw" }}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
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

      {/* Other sections of the component remain unchanged */}
      {/* Profile Image and Description Section */}
      <div
        className="container my-5 d-flex flex-column flex-md-row align-items-center"
        style={{ padding: "1rem" }}
      >
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-3 mb-md-0 ">
          <img
            src={profileImages[0]}
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
      {/* ... Rest of your component remains unchanged ... */}
    </div>
  );
}
