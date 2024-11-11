import React, { useState, useEffect } from "react";

export default function Home() {
  // Define image arrays
  const carouselImages = [
    "https://images.unsplash.com/photo-1721332153370-56d7cc352d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1721332153370-56d7cc352d63?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1728467459756-211f3c738697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8",
  ];

  const profileImages = [
    "../../public/passport.jpg",
    "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  ];

  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);

  useEffect(() => {
    // Set up intervals for the carousel images
    const carouselInterval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 1500); // Change every 1.5 seconds

    // Set up intervals for the profile images
    const profileInterval = setInterval(() => {
      setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profileImages.length);
    }, 3000); // Change every 3 seconds

    // Clear intervals on cleanup
    return () => {
      clearInterval(carouselInterval);
      clearInterval(profileInterval);
    };
  }, []);

  return (
    <div className="container ">
      {/* Carousel Section */}
      <div className="row">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ maxHeight: "500px" }}
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
        </div>
      </div>

      {/* Profile Image and Description Section */}
      <div className="container my-5 d-flex flex-column flex-md-row align-items-center" style={{ padding: "1rem" }}>
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
              borderRadius: "30px", // Controls roundness
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <p className="text-muted">
            This is the brief description about the tournament. Join us for an exciting tournament filled with action and enthusiasm. Compete, showcase your skills, and be a part of this thrilling sports event!
            <br/><a href="/">view more</a>
          </p>
        </div>
      </div>

      {/* Divider Line */}
      <hr
        style={{
          border: "none",
          borderTop: "3px solid #4a90e2", // Customize color to suit the theme
          width: "80%", // Adjust width to control line length
          margin: "2rem auto", // Center the line with margin
        }}
      />

      {/* Additional Info Section */}
      <div className="container my-5 d-flex flex-column flex-md-row align-items-center" style={{ padding: "1rem" }}>
        <div className="col-12 col-md-6">
          <p className="text-muted">
            Stay tuned for more updates on upcoming tournaments. Don’t miss the chance to compete and make memories in our grand sports events!<br/><a href='/'>view more</a>
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
    </div>
  );
}
