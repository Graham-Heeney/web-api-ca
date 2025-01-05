import React from "react";  // Import React for using JSX
import ArrowBackIcon from "@mui/icons-material/ArrowBack";  // Back arrow icon
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";  // Forward arrow icon
import Paper from "@mui/material/Paper";  // Paper component for styling
import IconButton from "@mui/material/IconButton";  // IconButton component for clickable icons
import Typography from "@mui/material/Typography";  // Typography for text
import HomeIcon from "@mui/icons-material/Home";  // Home icon for the homepage link
import { useNavigate } from "react-router-dom";  // Hook to navigate between pages

const MovieHeader = (props) => {
  const movie = props.movie;  // Destructure movie data passed as prop
  const navigate = useNavigate();  // Initialize the navigate function to control page navigation

  return (
    <Paper 
      component="div"  // Define Paper as a div element
      sx={{
        display: "flex",  // Use flexbox layout
        justifyContent: "space-around",  // Space out the elements evenly
        flexWrap: "wrap",  // Allow wrapping of elements
        padding: 1.5,  // Add padding to the Paper component
        margin: 0,  // Remove margin
      }}
    >
      {/* Back Button to navigate to the previous page */}
      <IconButton aria-label="go back" onClick={() => navigate(-1)} >  
        <ArrowBackIcon color="primary" fontSize="large" />  {/* Display back arrow icon */}
      </IconButton>

      {/* Movie Title and Tagline */}
      <Typography variant="h4" component="h3">
        {movie.title}  {/* Display the movie's title */}
        {/* Link to movie's homepage */}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />  {/* Home icon to link to homepage */}
        </a>
        <br />
        {/* Display movie tagline */}
        <span sx={{ fontSize: "1.5rem" }}>{`"${movie.tagline}"`}</span>  
      </Typography>

      {/* Forward Button to navigate to the next page */}
      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />  {/* Display forward arrow icon */}
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;  // Export the MovieHeader component to be used in other parts of the app
