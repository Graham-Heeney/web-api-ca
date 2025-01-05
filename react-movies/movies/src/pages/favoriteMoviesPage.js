import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import backgroundImage from "../images/pexels-megha-mangal-224592-806880.jpg";

const FavoriteMoviesPage = () => {
  const {favorites: movieIds } = useContext(MoviesContext); 
  // Access the list of favorite movie IDs from context

  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => { 
      // Loop through each favorite movie ID
      return { 
        queryKey: ["movie", { id: movieId }], 
        // Create a unique query key for each movie based on movieId
        queryFn: getMovie, 
        // Use the getMovie function to fetch the movie data
      };
    })
  );

  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true); 
  // Check if any of the queries are still loading

  if (isLoading) { 
    return <Spinner />; 
    // Display the spinner while movies are loading
  }

  const movies = favoriteMovieQueries.map((q) => { 
    // Map over the queries and prepare the movie data
    q.data.genre_ids = q.data.genres.map(g => g.id); 
    // Extract the genre IDs from the genres array
    return q.data; 
    // Return the updated movie data
  });

  const toDo = () => true; 
  // Placeholder function for future logic

  const backgroundStyle = { 
    backgroundImage:`url(${backgroundImage})`, 
    // Set the background image URL
    backgroundSize: "cover", 
    // Make sure the background image covers the whole container
    backgroundRepeat: "no-repeat", 
    // Prevent the background image from repeating
    backgroundAttachment: "fixed", 
    // Fix the background position when scrolling
    backgroundPosition: "center", 
    // Center the background image
    minHeight: "100vh", 
    // Make sure the container fills the entire viewport height
    margin: 0, 
    // Remove default margin
    padding: 0, 
    // Remove default padding
  };

  return (
    <div style={backgroundStyle}> 
      {/* Apply the background style to the main container */}
      <PageTemplate
        title="Favorite Movies" 
        movies={movies} 
        // Pass the list of movies to the PageTemplate
        action={(movie) => { 
          // Define the actions for each movie
          return (
            <>
              <RemoveFromFavorites movie={movie} /> 
              {/* Component to remove the movie from favorites */}
              <WriteReview movie={movie} /> 
              {/* Component to write a review for the movie */}
            </>
          );
        }}
      />
    </div>
  );
};

export default FavoriteMoviesPage;