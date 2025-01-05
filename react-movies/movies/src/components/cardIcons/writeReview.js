import React from "react";  // Import React for component creation
import RateReviewIcon from "@mui/icons-material/RateReview";  // Import the RateReview icon for the button
import { Link } from "react-router-dom";  // Import Link to navigate to the review form page

const WriteReviewIcon = ({ movie }) => {
  return (
    <Link
      to={`/reviews/form`}  // Link to the review form page
      state={{  // Pass the movie ID to the review form via the state object
          movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />  {/* Display the review icon */}
    </Link>
  );
};

export default WriteReviewIcon;  // Export the component to be used in other parts of the app
