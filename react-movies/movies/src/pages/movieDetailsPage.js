import React from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import { getMovie, getMovieCast } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";

const MoviePage = (props) => {
  const { id } = useParams(); 
  // Extract movie id from the URL parameters

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id }],
    getMovie
  );
  // Fetch movie details using the ID from the API

  const { data: castData, error: castError, isLoading: castLoading } = useQuery(
    ["movieCast", { id }],
    getMovieCast
  );
  // Fetch movie cast details from the API

  if (isLoading || castLoading) {
    return <Spinner />; 
    // Show loading spinner while data is being fetched
  }

  if (isError) {
    return <h1>{error.message}</h1>; 
    // Show error message if movie data fetch fails
  }

  if (castError) {
    return <h1>{castError.message}</h1>; 
    // Show error message if cast data fetch fails
  }

  const topCast = castData.cast.slice(0, 5); 
  // Get the top 5 cast members from the cast data

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
  // Set the background style for the movie page

  return (
    <div style={backgroundStyle}>
      <>
        {movie ? (
          <>
            <PageTemplate movie={movie}>
              {/* Render the PageTemplate component with movie details */}
              <MovieDetails movie={movie} cast={topCast} />
              {/* Pass movie and cast data to MovieDetails */}
            </PageTemplate>
          </>
        ) : (
          <p>Waiting for movie details</p>
        )}
        {/* Show message if movie details are not yet available */}
      </>
    </div>
  );
};

export default MoviePage;
