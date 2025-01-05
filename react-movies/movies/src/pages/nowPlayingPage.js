import React, { useState } from "react";  
import { getNowPlayingMovies } from "../api/movies-api"; 
import PageTemplate from "../components/templateMovieListPage"; 
import { useQuery } from "react-query"; 
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";
import { Pagination } from "@mui/material";

const NowPlayingMovies = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    // Track the current page number

    const { data, error, isLoading, isError } = useQuery(
      ['now_playing', { page: currentPage }],
      getNowPlayingMovies
    );

    // Fetch now playing movies data using react-query

    if (isLoading) {
      return <Spinner />;
      // Show loading spinner while fetching data
    }

    if (isError) {
        return <h1>{error.message}</h1>;
        // Show error message if data fetching fails
    }

    const nowPlayingMovies = data.results;
    // Extract now playing movies from the response

    const favorites = nowPlayingMovies.filter((m) => m.favorite);
    // Filter movies marked as favorites

    localStorage.setItem("favorites", JSON.stringify(favorites));
    // Store favorites in local storage

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };
    // Update current page when pagination changes

    const totalPages = Math.ceil(data.total_results / 20); 
    // Calculate total pages for pagination

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
    // Style for background image and layout

    return (
        <div style={backgroundStyle}>
          <PageTemplate
            title="Now Playing Movies"
            movies={nowPlayingMovies}
            action={(movie) => {
              return <AddToFavoritesIcon movie={movie} />;
            }}
            // Render the PageTemplate component with the list of movies
          />
    
          <Pagination
            style={{ marginTop: '25px', display: 'flex', justifyContent: 'center' }}
            count={totalPages}
            color="secondary"
            onChange={handlePageChange}
            page={currentPage}
            size="large"
            // Render the pagination control for switching pages
          />
        </div>
    );
};

export default NowPlayingMovies;
