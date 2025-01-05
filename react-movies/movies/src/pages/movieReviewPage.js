import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";

const MovieReviewPage = (props) => {
  let location = useLocation();
  // Get the current location from the URL
  const { movie, review } = location.state;
  // Extract movie and review data passed via the location state

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
  // Set the background style for the movie review page

  return (
    <div style={backgroundStyle}>
      <PageTemplate movie={movie}>
        {/* Render the PageTemplate component with the movie details */}
        <MovieReview review={review} />
        {/* Pass the review data to the MovieReview component */}
      </PageTemplate>
    </div>
  );
};

export default MovieReviewPage;
