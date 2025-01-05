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
    <div>
      <h2>Sign Up</h2>
      <p>You must register a username and password to log in.</p>
      <input value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)} /><br />
      <input value={password} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br />
      <input value={passwordAgain} type="password" placeholder="Confirm Password" onChange={(e) => setPasswordAgain(e.target.value)} /><br />
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <button onClick={register}>Register</button>
    </div>
  );
};

export default SignUpPage;
