import React, { useState } from "react";  // Import React and useState hook

export const MoviesContext = React.createContext(null);  // Create a context for managing movie state

const MoviesContextProvider = (props) => {
  // State to store favorite movie IDs
  const [favorites, setFavorites] = useState([]);  

  // Function to add a movie to favorites
  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {  // If movie is not already in favorites
      newFavorites = [...favorites, movie.id];  // Add the movie ID to the list
    } else {
      newFavorites = [...favorites];  // If already in favorites, keep the list unchanged
    }
    setFavorites(newFavorites);  // Update favorites state
  };

  // State to store reviews for movies
  const [myReviews, setMyReviews] = useState({});  

  // Function to add a review for a specific movie
  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });  // Add or update review for the movie
  };

  // Function to remove a movie from favorites
  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));  // Remove movie ID from favorites
  };

  return (
    // Provide context values to children components
    <MoviesContext.Provider
      value={{
        favorites,  // List of favorite movie IDs
        addToFavorites,  // Function to add movie to favorites
        removeFromFavorites,  // Function to remove movie from favorites
        addReview,  // Function to add a review for a movie
      }}
    >
      {props.children}  {/* Render children components passed to MoviesContextProvider */}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;  // Export the MoviesContextProvider component
