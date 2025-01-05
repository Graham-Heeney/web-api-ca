import React, { useContext } from "react";  // Import React and useContext to access the context
import IconButton from "@mui/material/IconButton";  // Import IconButton component for button UI
import DeleteIcon from "@mui/icons-material/Delete";  // Import DeleteIcon for the trash icon
import { MoviesContext } from "../../contexts/moviesContext";  // Import context to manage favorites

const RemoveFromFavoritesIcon = ({ movie }) => {
  const context = useContext(MoviesContext);  // Access the MoviesContext

  // Function to handle removing movie from favorites
  const handleRemoveFromFavorites = (e) => {
    e.preventDefault();  // Prevent default behavior (such as page reload)
    context.removeFromFavorites(movie);  // Call context method to remove movie from favorites
  };

  return (
    <IconButton
      aria-label="remove from favorites"  // Button label for accessibility
      onClick={handleRemoveFromFavorites}  // Trigger remove action on click
    >
      <DeleteIcon color="primary" fontSize="large" />  {/* Trash icon */}
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;  // Export the component for use in other parts of the app
