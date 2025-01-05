import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";  // Import context to manage favorites
import IconButton from "@mui/material/IconButton";  // Import IconButton component for the button UI
import FavoriteIcon from "@mui/icons-material/Favorite";  // Import FavoriteIcon for the heart icon

const AddToFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);  // Access the MoviesContext

  // Function to handle adding movie to favorites
  const handleAddToFavorites = (e) => {
    e.preventDefault();  // Prevent default behavior (such as page reload)
    context.addToFavorites(movie);  // Call context method to add movie to favorites
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>  {/* Button to trigger favorite action */}
      <FavoriteIcon color="primary" fontSize="large" />  {/* Heart icon */}
    </IconButton>
  );
};

export default AddToFavoritesIcon;