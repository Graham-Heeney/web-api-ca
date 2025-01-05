import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';  
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true); 
  const [error, setError] = useState(''); // Error state to handle authentication issues

  const handleAuth = async (e) => {
    e.preventDefault();
    // Handle form submission for either signup or login

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Sign up the user with Firebase authentication
        await sendEmailVerification(userCredential.user);
        // Send verification email upon successful signup
        alert("Sign-up successful! A verification email has been sent.");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Sign in the user
        alert("Sign-in successful!");
      }
    } catch (err) {
      setError(err.message);
      // Set the error message if authentication fails
    }
  };

  const backgroundStyle = {
    backgroundImage:`url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  };
  // Background styling for the page

  return (
    <div style={backgroundStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#f4f4f9",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "2rem",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
          {/* Toggle between Sign Up and Sign In titles */}
          <form onSubmit={handleAuth}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                margin: "0.5rem 0",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              required
            />
            {/* Input field for email */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                margin: "0.5rem 0",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
              required
            />
            {/* Input field for password */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "1rem",
                background: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            {/* Button for submitting the form */}
          </form>
          {error && <p style={{ color: "#d32f2f", marginTop: "1rem" }}>{error}</p>}
          {/* Display error message if there is an authentication error */}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            style={{
              marginTop: "1rem",
              background: "none",
              border: "none",
              color: "#1976d2",
              cursor: "pointer",
            }}
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
          {/* Toggle between Sign In and Sign Up form */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
