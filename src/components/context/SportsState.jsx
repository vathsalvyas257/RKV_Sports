import SportsContext from "./SportsContext";
import React, { useState, useEffect } from 'react';

const url = "http://127.0.0.1:8000";

const SportsState = (props) => {
  const [carouselImages, setCarouselImages] = useState([]);

  // Fetch all carousel images
  const getCarouselImages = async () => {
    try {
      const response = await fetch(`${url}/banner/`);
      if (response.ok) {
        const images = await response.json();
        setCarouselImages(images);
      } else {
        console.error("Failed to fetch images");
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Add a new carousel image
  const addCarouselImage = async (imageData) => {
    try {
      const response = await fetch(`${url}/banner/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(imageData)
      });

      if (response.ok) {
        const newImage = await response.json();
        setCarouselImages([...carouselImages, newImage]);
      } else {
        console.error("Failed to add image");
      }
    } catch (error) {
      console.error("Error adding image:", error);
    }
  };

  // Delete a carousel image by ID
  const deleteCarouselImage = async (imageId) => {
    try {
      const response = await fetch(`${url}/banner/${imageId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCarouselImages(carouselImages.filter((image) => image.id !== imageId));
      } else {
        console.error("Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Update a carousel image by ID
  const updateCarouselImage = async (imageId, updatedData) => {
    try {
      const response = await fetch(`${url}/banner/${imageId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
      });

      if (response.ok) {
        const updatedImage = await response.json();
        setCarouselImages(
          carouselImages.map((image) =>
            image.id === imageId ? updatedImage : image
          )
        );
      } else {
        console.error("Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    getCarouselImages();
  }, []);
  console.log(carouselImages);
  return (
    <SportsContext.Provider
      value={{
        carouselImages,
        addCarouselImage,
        getCarouselImages,
        deleteCarouselImage,
        updateCarouselImage
      }}
    >
      {props.children}
    </SportsContext.Provider>
  );
};

export default SportsState;
