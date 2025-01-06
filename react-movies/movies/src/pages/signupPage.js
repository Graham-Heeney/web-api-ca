import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContexts';

const SignUpPage = () => {
  const context = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registered, setRegistered] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    let passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const validPassword = passwordRegEx.test(password);

    if (!validPassword) {
      setErrorMessage("Password must be at least 8 characters long and include at least one letter, one number, and one special character.");
      return;
    }

    if (password !== passwordAgain) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await context.register(userName, password);
      setRegistered(true);
    } catch (error) {
      setErrorMessage(error.message || "Something went wrong during registration.");
    }
  };

  if (registered) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f4f8" }}>
      <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px", textAlign: "center" }}>
        <h2 style={{ color: "#1976d2" }}>Sign Up</h2>
        <p style={{ color: "#333" }}>You must register a username and password to log in.</p>
        <input 
          value={userName} 
          placeholder="Username" 
          onChange={(e) => setUserName(e.target.value)} 
          style={{ 
            width: "100%", 
            padding: "10px", 
            margin: "10px 0", 
            borderRadius: "4px", 
            border: "1px solid #ddd", 
            fontSize: "16px" 
          }} 
        />
        <input 
          value={password} 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ 
            width: "100%", 
            padding: "10px", 
            margin: "10px 0", 
            borderRadius: "4px", 
            border: "1px solid #ddd", 
            fontSize: "16px" 
          }} 
        />
        <input 
          value={passwordAgain} 
          type="password" 
          placeholder="Confirm Password" 
          onChange={(e) => setPasswordAgain(e.target.value)} 
          style={{ 
            width: "100%", 
            padding: "10px", 
            margin: "10px 0", 
            borderRadius: "4px", 
            border: "1px solid #ddd", 
            fontSize: "16px" 
          }} 
        />
        {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>}
        <button 
          onClick={register} 
          style={{ 
            width: "100%", 
            padding: "12px", 
            backgroundColor: "#1976d2", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer", 
            fontSize: "16px" 
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
