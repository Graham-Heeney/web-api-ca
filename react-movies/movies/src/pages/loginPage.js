import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom'
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault(); 
        // Prevent default form submission behavior

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/home"); 
            // Redirect to home page after successful login
            console.log(user); 
            // Log the user object to the console
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage); 
            // Log error details in case of login failure
        });
    };

    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
    };

    return (
        <div style={backgroundStyle}>
            {/* Set background style with an image and adjust properties */}
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
                    <h2>Login</h2>
                    <form onSubmit={onLogin}>
                        {/* Handle form submission with onLogin */}
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
                            Login
                        </button>
                    </form>
                    <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
                        No account yet?{" "}
                        <NavLink
                            to="/signup"
                            style={{
                                color: "#1976d2",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Sign Up
                        </NavLink>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
