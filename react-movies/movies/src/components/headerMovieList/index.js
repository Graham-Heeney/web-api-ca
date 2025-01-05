import React from "react"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; 
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"; 
import Paper from "@mui/material/Paper"; 
import IconButton from "@mui/material/IconButton"; 
import Typography from "@mui/material/Typography"; 
import { useNavigate } from "react-router-dom"; 
import { useTheme } from "@mui/material/styles"; 

// Header component that displays a navigation bar with a title
const Header = (props) => {
  const title = props.title; // Get the title passed as a prop
  const navigate = useNavigate(); // Use navigate hook for navigation
  const theme = useTheme(); // Use MUI's theme for styling

  return (
    <Paper
      component="div"
      sx={{
        display: "flex", // Display items in a row
        justifyContent: "space-around", // Space out items evenly
        flexWrap: "wrap", // Allow items to wrap on smaller screens
        backgroundColor: theme.palette.primary.main, // Set background color using theme
        padding: "10px", // Add padding around content
      }}
    >
      {/* Button to go back to the previous page */}
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)} // Navigate back one step in history
        sx={{ color: "white" }} // Set icon color to white
      >
        <ArrowBackIcon fontSize="large" /> {/* Back arrow icon */}
      </IconButton>

      {/* Display title in the center */}
      <Typography
        variant="h4"
        component="h3"
        sx={{
          color: "white", // Set text color to white
          textAlign: "center", // Center-align the text
          flex: 1, // Allow the text to take up available space
        }}
      >
        {title} {/* Display the title passed as a prop */}
      </Typography>

      {/* Button to go forward to the next page */}
      <IconButton
        aria-label="go forward"
        onClick={() => navigate(+1)} // Navigate forward one step in history
        sx={{ color: "white" }} // Set icon color to white
      >
        <ArrowForwardIcon fontSize="large" /> {/* Forward arrow icon */}
      </IconButton>
    </Paper>
  );
};

export default Header; 
