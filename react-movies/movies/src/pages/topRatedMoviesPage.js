import React, { useState } from "react";  
import { getTopRatedMovies } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateMovieListPage"; 
import { useQuery } from "react-query"; 
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";
import { Pagination } from "@mui/material";

const TopRatedMovies = (props) => {
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page number

  const { data, error, isLoading, isError } = useQuery(
    ['topRated', currentPage], 
    () => getTopRatedMovies(currentPage) // Fetch top-rated movies based on the current page
  );
  
  if (isLoading) {
    return <Spinner />; // Show a loading spinner while data is being fetched
  }

  if (isError) {
    return <h1>{error.message}</h1>; // Display an error message if the request fails
  }

  const topRatedMovies = data.results; // Get the list of top-rated movies

  // Filter movies that are marked as favorite
  const favorites = topRatedMovies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites)); // Store favorites in local storage

  const handlePageChange = (event, page) => {
    setCurrentPage(page); // Update the current page when pagination is changed
  };

  const totalPages = Math.ceil(data.total_results / 20); // Calculate the total number of pages based on results

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, // Background image styling
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
      <PageTemplate
        title="Top Rated Movies"
        movies={topRatedMovies} // Pass the top-rated movies to the PageTemplate component
        action={(movie) => {
          return <AddToFavoritesIcon movie={movie} />; // Add the action to mark movies as favorites
        }}
      />

      {/* Pagination component to navigate through pages of movies */}
      <Pagination
        style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
        count={totalPages} // Total number of pages
        color="secondary"
        onChange={handlePageChange} // Handle page change event
        page={currentPage} // Current page number
        size="large"
      />
    </div>
  );
};

export default TopRatedMovies;
