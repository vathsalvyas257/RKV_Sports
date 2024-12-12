import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the registration page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/registration');
    }, 3000); // 3 seconds delay

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="container mt-5 text-center">
      <h1>Registration Successful!</h1>
      <p>Your team has been successfully registered. You will be redirected to the registration page shortly.</p>
    </div>
  );
};

export default RegistrationSuccess;
