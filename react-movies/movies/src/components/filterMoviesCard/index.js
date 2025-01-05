import React, { useState, useEffect } from "react";  // Import necessary hooks and components
import Card from "@mui/material/Card";  // Import Card component for the layout
import CardMedia from "@mui/material/CardMedia";  // Import CardMedia to display images
import CardContent from "@mui/material/CardContent";  // Import CardContent for the card's body
import Typography from "@mui/material/Typography";  // Import Typography for text styling
import InputLabel from "@mui/material/InputLabel";  // Import InputLabel for form labels
import MenuItem from "@mui/material/MenuItem";  // Import MenuItem for dropdown options
import TextField from "@mui/material/TextField";  // Import TextField for search input
import SearchIcon from "@mui/icons-material/Search";  // Import SearchIcon for the search button
import FormControl from "@mui/material/FormControl";  // Import FormControl for input grouping
import Select from "@mui/material/Select";  // Import Select for dropdown menu
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'  // Import the background image
import { getGenres } from "../../api/tmdb-api";  // Import the API function to fetch genres
import { useQuery } from "react-query";  // Import useQuery hook for data fetching
import Spinner from '../spinner'  // Import Spinner for loading state
import { useTheme } from "@mui/material/styles";  // Import useTheme hook for theme customization

const formControl = {  // Style for form control elements
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {
  // Fetch genres data using the useQuery hook
  const { data, error, isLoading, isError } = useQuery("genres", getGenres); 
  const theme = useTheme();  // Access current theme for styling

  if (isLoading) {  // Show loading spinner while fetching genres
    return <Spinner />;
  }

  if (isError) {  // Show error message if fetching genres fails
    return <h1>{error.message}</h1>;
  }

  const genres = data.genres;  // Get genres data
  if (genres[0].name !== "All") {  // Add 'All' option at the beginning of genres list
    genres.unshift({ id: "0", name: "All" });
  }

  // Handle changes in the text search input
  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);  // Pass filter data to parent component
  };

  // Handle text input change
  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  // Handle genre dropdown change
  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  return (
    <Card  // Main container card component
      sx={{
        backgroundColor: theme.palette.primary.main,
        borderRadius: 2, 
        boxShadow: 3, 
        margin: '15px',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.05)' },  // Hover effect
      }}
      variant="outlined"
    >
      <CardContent sx={{ color: 'white' }}> 
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />  
          
        </Typography>
        <TextField
          sx={{ ...formControl, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}  // Style for search input
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}  // Pass title filter value from props
          onChange={handleTextChange}  // Handle search input change
        />
        <FormControl sx={{ ...formControl, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>  
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}  // Pass genre filter value from props
            onChange={handleGenreChange}  // Handle genre change
          >
            {genres.map((genre) => {  // Map through genres and display them in dropdown
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{
          height: 300,
          objectFit: 'cover',
          borderTop: `2px solid ${theme.palette.primary.light}`,
        }}
        image={img}  // Set the background image
        title="Filter"  // Set title for media
      />
      <CardContent sx={{ color: 'white' }}>  
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />  
          
          Filter the movies.
        </Typography>
      </CardContent>
    </Card>
  );
}
