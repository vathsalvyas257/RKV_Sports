import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import React, { useState } from "react";

const url = "http://127.0.0.1:8000";

const AuthState = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to store error messages

  const signup = async (userData) => {
    try {
      const formData = new FormData();

      // Append all fields to the FormData object
      formData.append("student_name", userData.name);
      formData.append("student_id", userData.id);
      formData.append("year", userData.year);
      formData.append("mail", userData.email);
      formData.append("gender", userData.gender);
      formData.append("password", userData.password);

      if (userData.image) {
        formData.append("profile_image", userData.image);
      }

      const response = await fetch(`${url}/students/`, {
        method: "POST",
        body: formData, // Send FormData directly
      });

      if (response.status === 409) {
        setError("This ID or email is already in use. Please choose another one.");
        return;
      }

      if (!response.ok) {
        throw new Error("Signup failed.");
      }

      const data = await response.json();
      const token = data.token; // Adjust based on the actual API response
      localStorage.setItem("token", token);
      console.log("Signup successful");
      navigate("/login");
    } catch (error) {
      setError("Signup failed. Please try again.");
      console.error("Error during signup:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, error }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
