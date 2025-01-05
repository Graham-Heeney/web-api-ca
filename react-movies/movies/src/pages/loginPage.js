import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContexts';
import { Link } from "react-router-dom";

const LoginPage = props => {
    const context = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        context.authenticate(userName, password);
    };

    let location = useLocation();
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f4f8" }}>
            <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "400px", textAlign: "center" }}>
                <h2 style={{ color: "#1976d2" }}>Login</h2>
                <input 
                    id="username" 
                    placeholder="User Name" 
                    onChange={e => setUserName(e.target.value)} 
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
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)} 
                    style={{ 
                        width: "100%", 
                        padding: "10px", 
                        margin: "10px 0", 
                        borderRadius: "4px", 
                        border: "1px solid #ddd", 
                        fontSize: "16px" 
                    }} 
                />
                <button 
                    onClick={login} 
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
                    Log In
                </button>
                <p style={{ marginTop: "20px", fontSize: "14px" }}>
                    Not Registered? 
                    <Link to="/signup" style={{ color: "#1976d2", textDecoration: "none", fontWeight: "bold" }}> Sign Up!</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
