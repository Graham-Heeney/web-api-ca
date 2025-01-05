import React from "react";  // Import React
import PageTemplate from "../components/templateMoviePage";  // Import PageTemplate component for the movie page layout
import ReviewForm from "../components/reviewForm";  // Import the ReviewForm component for writing reviews
import { useLocation } from "react-router-dom";  // Import useLocation hook to access the current location in the router
import { useQuery } from "react-query";  // Import useQuery hook for data fetching and caching
import { getMovie } from "../api/tmdb-api";  // Import the function to fetch movie details from the TMDB API
import Spinner from "../components/spinner";  // Import Spinner component to show loading indicator
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";  // Import a background image for styling

const WriteReviewPage = (props) => {
  // Access the movieId from the router's location state
  const location = useLocation();
  const movieId = location.state.movieId;

  // Use useQuery hook to fetch movie data by movieId
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],  // Query key with movieId as the identifier
    getMovie  // Function to fetch the movie data
  );

  // Show a loading spinner while the movie data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  // Show error message if fetching the movie data fails
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Background style for the page, using a background image and setting size, position, etc.
  const backgroundStyle = {
    backgroundImage:`url(${backgroundImage})`,  // Set the background image
    backgroundSize: "cover",  // Ensure the background image covers the whole area
    backgroundRepeat: "no-repeat",  // Prevent repeating the background image
    backgroundAttachment: "fixed",  // Keep the background fixed while scrolling
    backgroundPosition: "center",  // Center the background image
    minHeight: "100vh",  // Ensure the minimum height covers the whole viewport
    margin: 0,  // Remove default margin
    padding: 0,  // Remove default padding
  };

  // Return the page layout with a background image and components
  return (<div style={backgroundStyle}>  
    <PageTemplate movie={movie}>  
      <ReviewForm movie={movie} />  
    </PageTemplate>
  </div>);
};

export default WriteReviewPage;  // Export the WriteReviewPage component as default
