import React from "react"; // Import React to use JSX and create the component
import Typography from "@mui/material/Typography"; // Import Typography component from Material-UI for text formatting

// MovieReview component to display individual movie review information
const MovieReview = ({ review }) => {
  return (
    <>
      {/* Display the author of the review */}
      <Typography variant="h5" component="h3">
        Review By: {review.author}
      </Typography>

      {/* Display the content of the review */}
      <Typography variant="h6" component="p">
        {review.content} 
      </Typography>
    </>
  );
};

export default MovieReview; // Export the component for use in other parts of the app
