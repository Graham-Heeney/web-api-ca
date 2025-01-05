import React, { useState, useContext } from "react"; // Import React, useState, and useContext hooks
import Button from "@mui/material/Button"; // Import MUI Button component
import TextField from "@mui/material/TextField"; // Import MUI TextField component for form inputs
import MenuItem from "@mui/material/MenuItem"; // Import MUI MenuItem for dropdown options
import Typography from "@mui/material/Typography"; // Import MUI Typography component for text styling
import Box from "@mui/material/Box"; // Import MUI Box component for layout and spacing
import { useForm, Controller } from "react-hook-form"; // Import React Hook Form for form handling and validation
import { MoviesContext } from "../../contexts/moviesContext"; // Import MoviesContext to manage global state for movies
import Snackbar from "@mui/material/Snackbar"; // Import MUI Snackbar component for notifications
import MuiAlert from "@mui/material/Alert"; // Import MUI Alert component for displaying notifications
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation

// Rating options for the dropdown
const ratings = [
  { value: 5, label: "Excellent" },
  { value: 4, label: "Good" },
  { value: 3, label: "Average" },
  { value: 2, label: "Poor" },
  { value: 0, label: "Terrible" },
];

// Styling for the form and elements
const styles = {
  root: {
    marginTop: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  form: {
    width: "100%",
    "& > * ": {
      marginTop: 2,
    },
  },
  textField: {
    width: "40ch",
  },
  submit: {
    marginRight: 2,
  },
  snack: {
    width: "50%",
    "& > * ": {
      width: "100%",
    },
  },
};

const ReviewForm = ({ movie }) => {
  const context = useContext(MoviesContext); // Access movies context to add the review to the global state

  const [rating, setRating] = useState(3); // Manage the rating state with a default value of 3
  const [open, setOpen] = useState(false); // Manage the state of the snackbar notification (open/close)
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Default values for the form fields
  const defaultValues = {
    author: "",
    review: "",
    agree: false,
    rating: "3",
  };

  // Close the snackbar and navigate to the favorites page
  const handleSnackClose = (event) => {
    setOpen(false);
    navigate("/movies/favorites");
  };

  // useForm hook to manage form state and validation
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm(defaultValues);

  // Handle rating change from dropdown
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Handle form submission and call the addReview function from context
  const onSubmit = (review) => {
    review.movieId = movie.id; // Add movie ID to the review
    review.rating = rating; // Add selected rating
    context.addReview(movie, review); // Add the review to the movies context
    setOpen(true); // Trigger the snackbar notification
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">
        Write a review
      </Typography>

      {/* Snackbar for notification when review is successfully submitted */}
      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <MuiAlert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h4">Thank you for submitting a review</Typography>
        </MuiAlert>
      </Snackbar>

      {/* Review form */}
      <form sx={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Author field */}
        <Controller
          name="author"
          control={control}
          rules={{ required: "Name is required" }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              onChange={onChange}
              value={value}
              id="author"
              label="Author's name"
              name="author"
              autoFocus
            />
          )}
        />
        {/* Display error message for author field if validation fails */}
        {errors.author && (
          <Typography variant="h6" component="p">
            {errors.author.message}
          </Typography>
        )}

        {/* Review content field */}
        <Controller
          name="review"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="review"
              value={value}
              onChange={onChange}
              label="Review text"
              id="review"
              multiline
              minRows={10}
            />
          )}
        />
        {/* Display error message for review field if validation fails */}
        {errors.review && (
          <Typography variant="h6" component="p">
            {errors.review.message}
          </Typography>
        )}

        {/* Rating selection dropdown */}
        <Controller
          control={control}
          name="rating"
          render={({ field: { onChange, value } }) => (
            <TextField
              id="select-rating"
              select
              variant="outlined"
              label="Rating Select"
              value={rating}
              onChange={handleRatingChange}
              helperText="Don't forget your rating"
            >
              {ratings.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Submit and Reset buttons */}
        <Box sx={styles.buttons}>
          <Button type="submit" variant="contained" color="primary" sx={styles.submit}>
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => {
              reset({
                author: "",
                content: "",
              });
            }}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
