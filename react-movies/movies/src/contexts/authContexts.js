import React, { useState, createContext } from "react";
import { login, signup } from "../api/movies-api";

// Create AuthContext
export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(existingToken ? true : false);
  const [userName, setUserName] = useState("");

  const setToken = (data) => {
    localStorage.setItem("token", data);
  };

  const authenticate = async (username, password) => {
    const result = await login(username, password); // Call login function
    if (result.token) {
      setToken(result.token);  // Store token and set authenticated state
      setIsAuthenticated(true);
      setUserName(username);
    }
    return result.token ? true : false;
  };

  const signout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName("");
  };

  const register = async (username, password) => {
    const result = await signup(username, password);
    return (result.code == 201) ? true : false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, authenticate, signout, register, userName }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
