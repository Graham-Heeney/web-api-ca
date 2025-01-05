import React, { useState } from "react";  // Import React and useState hook for state management
import Header from "../headerMovieList";  // Import custom Header component
import FilterCard from "../filterMoviesCard";  // Import custom FilterCard component
import MovieList from "../movieList";  // Import custom MovieList component
import Grid from "@mui/material/Grid";  // Import Grid component from Material UI for layout

function MovieListPageTemplate({ movies, title, action }) {
  // Declare state variables for name filter and genre filter
  const [nameFilter, setNameFilter] = useState("");  // Stores the search text for movie names
  const [genreFilter, setGenreFilter] = useState("0");  // Stores the selected genre filter (default is "0" for all genres)
  const genreId = Number(genreFilter);  // Converts genreFilter to a number

  // Filter the movies based on the name filter and genre filter
  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;  // Filters movies by name
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;  // Filters movies by genre if genreId is valid
    });

  // Handle change for filters
  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);  // Updates the name filter
    else setGenreFilter(value);  // Updates the genre filter
  };

  return (
    <Grid container spacing={2} style={{ padding: "15px" }}>  
      <Grid item xs={12}> 
        <Header title={title} />  
      </Grid>

      <Grid container spacing={2}>  
        <Grid item xs={12} sm={4} md={3} lg={3} sx={{ padding: "10px" }}>  
          <FilterCard
            onUserInput={handleChange}  // Pass the handleChange function as a prop
            titleFilter={nameFilter}  // Pass the name filter value as a prop
            genreFilter={genreFilter}  // Pass the genre filter value as a prop
          />
        </Grid>

        <Grid item xs={12} sm={8} md={9} lg={9}> 
          <MovieList action={action} movies={displayedMovies} />  
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;  // Export the component for use in other parts of the app
