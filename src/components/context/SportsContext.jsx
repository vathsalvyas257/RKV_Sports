import  { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context with a default value (optional)
const SportsContext = createContext();

export const SportsProvider = ({ children }) => {
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/banner/");
        if (Array.isArray(response.data)) {
          setCarouselImages(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching carousel images:", error);
        alert("Failed to load carousel images. Please try again later.");
      }
    };

    fetchImages();
  }, []);

  const addCarouselImage = (newImage) => {
    setCarouselImages((prevImages) => [...prevImages, newImage]);
  };

  return (
    <SportsContext.Provider value={{ carouselImages, addCarouselImage }}>
      {children}
    </SportsContext.Provider>
  );
};

export default SportsContext;