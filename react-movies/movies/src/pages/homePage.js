import React, { useState } from "react";  
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";
import { Pagination } from "@mui/material";

const HomePage = (props) => {
  const [currentPage, setCurrentPage] = useState(1); 
  // Set initial page number to 1

  const { data, error, isLoading, isError } = useQuery(
    ['discover', currentPage], 
    () => getMovies(currentPage)  
    // Fetch movies based on the current page number
  );

  if (isLoading) {
    return <Spinner />;
    // Show spinner while data is loading
  }

  if (isError) {
    return <h1>{error.message}</h1>;
    // Show error message if there is an issue fetching data
  }

  const movies = data.results; 
  // Get movie results from the fetched data

  const favorites = movies.filter((m) => m.favorite);
  // Filter out the favorite movies from the results
  localStorage.setItem('favorites', JSON.stringify(favorites)); 
  // Store the favorite movies in localStorage

  const handlePageChange = (event, page) => {
    setCurrentPage(page);  
    // Update current page when user changes page
  };

  const totalPages = Math.ceil(data.total_results / 20); 
  // Calculate the total number of pages based on the total number of results

  const backgroundStyle = {
    position: 'relative',
    backgroundImage: `url(${backgroundImage})`,
    // Set the background image
    backgroundSize: "cover",
    // Make the background image cover the entire container
    backgroundRepeat: "no-repeat",
    // Prevent repeating the background image
    backgroundAttachment: "fixed",
    // Fix the background position during scrolling
    backgroundPosition: "center",
    // Center the background image
    minHeight: "100vh",
    // Set the minimum height to the full height of the viewport
    margin: 0,
    // Remove default margin
    padding: 0,
    // Remove default padding
  };
  

  return (
    <>
      <div style={backgroundStyle}>
        {/* Apply the background style to the container */}
        <PageTemplate
          title="Discover Movies"
          movies={movies}
          action={(movie) => {
            return <AddToFavoritesIcon movie={movie} />;
            // Display the AddToFavoritesIcon for each movie
          }}
        />
      </div>

      <Pagination
        style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
        count={totalPages} 
        // Set the total number of pages for pagination
        color="secondary"
        onChange={handlePageChange} 
        // Handle page change when user clicks on a page
        page={currentPage} 
        // Set the current page for the pagination
        size="large"
      />
    </>
  );
};

export default HomePage;
