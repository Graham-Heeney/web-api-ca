import React, { useState, useEffect } from "react"; // React and hooks
import AppBar from "@mui/material/AppBar"; // MUI AppBar component for the header
import Toolbar from "@mui/material/Toolbar"; // MUI Toolbar component
import Typography from "@mui/material/Typography"; // MUI Typography for text
import Button from "@mui/material/Button"; // MUI Button for actions
import { useNavigate } from "react-router-dom"; // React Router hook for navigation
import { styled } from "@mui/material/styles"; // MUI styled component
import { auth } from "../../firebase"; // Firebase auth module
import { signOut, onAuthStateChanged } from "firebase/auth"; // Firebase authentication methods
import Box from "@mui/material/Box"; // MUI Box for layout
import Container from "@mui/material/Container"; // MUI Container for responsive layout

// Styled component for the AppBar offset
const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [user, setUser] = useState(null); // State for managing user authentication status
  const navigate = useNavigate(); // Hook for navigation

  // Set up authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Update user state on authentication change
    });
    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  // Handle user sign out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        navigate("/"); // Navigate to homepage on successful sign-out
      })
      .catch((error) => {
        console.log(error.message); // Log any error that occurs during sign out
      });
  };

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Graham's TMDB Client
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "15px", alignItems: "center" }}>
            {/* Navigation buttons */}
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/movies/favorites")}>
              Favorites
            </Button>
            <Button color="inherit" onClick={() => navigate("/movies/top-rated")}>
              Top Rated Movies
            </Button>
            <Button color="inherit" onClick={() => navigate("/movies/now-playing")}>
              Now Playing Movies
            </Button>

            {/* Conditionally render buttons based on user authentication */}
            {user ? (
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out
              </Button>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate("/signup")}>
                  Sign Up
                </Button>
                <Button color="inherit" onClick={() => navigate("/login")}>
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Offset /> {/* Offset to prevent content from being hidden under the AppBar */}
    </>
  );
};

export default SiteHeader;
