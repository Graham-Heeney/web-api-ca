import React, { useEffect, useState } from "react"; // Import React and hooks for state and lifecycle management
import Table from "@mui/material/Table"; // Import Material-UI Table component for creating a table
import TableBody from "@mui/material/TableBody"; // Import TableBody for table rows
import TableCell from "@mui/material/TableCell"; // Import TableCell for table cells
import TableContainer from "@mui/material/TableContainer"; // Import TableContainer for wrapping the table in a Paper component
import TableHead from "@mui/material/TableHead"; // Import TableHead for the header section of the table
import TableRow from "@mui/material/TableRow"; // Import TableRow for defining rows in the table
import Paper from "@mui/material/Paper"; // Import Paper for styling and wrapping the table
import { Link } from "react-router-dom"; // Import Link to navigate between pages using React Router
import { getMovieReviews } from "../../api/tmdb-api"; // Import the API function to get movie reviews from the TMDB API
import { excerpt } from "../../util"; // Import a utility function to create an excerpt of the review content
import { useQuery } from "react-query"; // Import useQuery hook from react-query to fetch and manage data
import Spinner from '../spinner'; // Import Spinner component to display loading indicator

// MovieReviews component fetches and displays movie reviews in a table
export default function MovieReviews({ movie }) {
  // Use useQuery hook to fetch movie reviews based on movie ID
  const { data, error, isLoading, isError } = useQuery(
    ["reviews", { id: movie.id }], // Query key for caching the reviews data
    getMovieReviews // Function to fetch the reviews
  );

  // Show a loading spinner while data is being fetched
  if (isLoading) {
    return <Spinner />;
  }

  // Display an error message if there's an issue fetching the data
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  // Extract the reviews data from the response
  const reviews = data.results;

  return (
    <TableContainer component={Paper}> {/* Wrap the table in a Paper component for styling */}
      <Table sx={{ minWidth: 550 }} aria-label="reviews table"> {/* Define table with a minimum width */}
        <TableHead>
          {/* Define the header row of the table */}
          <TableRow>
            <TableCell>Author</TableCell> {/* Column for the author of the review */}
            <TableCell align="center">Excerpt</TableCell> {/* Column for the excerpt of the review */}
            <TableCell align="right">More</TableCell> {/* Column for the "Full Review" link */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Map over the reviews and display each in a row */}
          {reviews.map((r) => (
            <TableRow key={r.id}>
              <TableCell component="th" scope="row">
                {r.author} {/* Display the author of the review */}
              </TableCell>
              <TableCell>{excerpt(r.content)}</TableCell> {/* Display an excerpt of the review content */}
              <TableCell>
                {/* Link to the full review page */}
                <Link
                  to={`/reviews/${r.id}`} // Navigate to the review details page
                  state={{
                    review: r, // Pass the review data to the details page
                    movie: movie, // Pass the movie data to the details page
                  }}
                >
                  Full Review
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
