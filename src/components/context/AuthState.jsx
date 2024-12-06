import React from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthState = ({ children }) => {
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000"; // Centralized Base URL

  // Check if a user is logged in
  const userIn = () => {
    return localStorage.getItem("studentId");
  };

  // Fetch user details
  const user = async () => {
    try {
      const response = await fetch(`${baseURL}/students/${localStorage.getItem("student_id")}`);
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      return await response.json();
    } catch (err) {
      console.error("Error fetching user data:", err);
      return null;
    }
  };

  // Signup method to create a new user
  const signup = async (userData) => {
    try {
      const formData = new FormData();
      formData.append("student_name", userData.name);
      formData.append("student_id", userData.id);
      formData.append("year", userData.year);
      formData.append("mail", userData.email);
      formData.append("gender", userData.gender);
      formData.append("password", userData.password);

      if (userData.image) {
        formData.append("profile_image", userData.image);
      }

      const response = await fetch(`${baseURL}/students/`, {
        method: "POST",
        body: formData,
      });

      if (response.status === 409) {
        return { error: "This ID or email is already in use. Please choose another one." };
      }

      if (!response.ok) {
        throw new Error("Signup failed.");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.token);
      return { success: true };
    } catch (err) {
      console.error("Error during signup:", err);
      return { error: err.message || "Signup failed. Please try again." };
    }
  };

  // Login method to authenticate a user
  const login = async (credentials) => {
    try {
      const response = await fetch(`${baseURL}/login/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(credentials),
      });

      if (!response.ok) {
        throw new Error("Invalid login credentials.");
      }

      const data = await response.json();

      // Store tokens in localStorage
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);

      // Fetch user details if needed
      const userDetails = await user();
      if (userDetails) {
        localStorage.setItem("user", JSON.stringify(userDetails));
      }

      navigate("/"); // Redirect after successful login
    } catch (err) {
      console.error("Error during login:", err);
      return { error: err.message || "Login failed. Please try again." };
    }
  };

  // Logout method to clear session data
  const logout = () => {
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("student_id");
      localStorage.removeItem("user");
      navigate("/login"); // Redirect to login page after logout
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login, logout, userIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
