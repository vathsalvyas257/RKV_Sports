import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHourglassHalf } from 'react-icons/fa'; // You can use other icons as well, here I used an hourglass to indicate waiting

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
      <div className="mt-4">
        <h3>Application Under Process</h3>
        <p>Your registration is under review. The admin will approve  your application soon.<FaHourglassHalf size={50} color="#FFA500" /></p>
        
      </div>
      <p>You will be redirected to the registration page shortly.</p>

      {/* New message about the application status */}
      
    </div>
  );
};

export default RegistrationSuccess;
