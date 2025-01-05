import { useEffect, useState } from "react";  // Import React hooks: useEffect and useState
import { getMovie } from '../api/tmdb-api';  // Import the function to fetch movie details from TMDB API

// Custom hook to fetch a movie by its ID
const useMovie = id => {
  // State to store the movie details
  const [movie, setMovie] = useState(null);  

  useEffect(() => {
    // Fetch movie data when the component mounts or the id changes
    getMovie(id).then(movie => {
      setMovie(movie);  // Set the fetched movie data into the state
    });
  }, [id]);  // Dependency array ensures the effect runs again if the id changes

  return [movie, setMovie];  // Return movie state and the setMovie function to update the state
};

export default useMovie;  // Export the custom hook for use in other components
