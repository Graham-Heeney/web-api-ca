import React, { useContext, useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { AuthContext } from "../../contexts/authContexts"; // Import AuthContext
import Box from "@mui/material/Box";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const { isAuthenticated, signout, userName } = useContext(AuthContext); // Consume AuthContext
  const navigate = useNavigate();

  const handleSignOut = () => {
    signout(); // Log out and update the state in AuthContext
    navigate("/"); // Redirect to home after sign out
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
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleSignOut}>
                Sign Out ({userName})
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
