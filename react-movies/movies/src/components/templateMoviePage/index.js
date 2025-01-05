import React, { useState, useEffect } from "react";  // Import necessary React hooks
import MovieHeader from "../headerMovie";  // Import MovieHeader component for displaying movie details
import Grid from "@mui/material/Grid2";  // Import Grid2 for layout
import ImageList from "@mui/material/ImageList";  // Import ImageList component to display images
import ImageListItem from "@mui/material/ImageListItem";  // Import ImageListItem to render individual images
import { getMovieImages } from "../../api/tmdb-api";  // Import API call to fetch movie images
import { useQuery } from "react-query";  // Import useQuery hook from React Query for fetching data
import Spinner from '../spinner'  // Import Spinner component to show loading indicator

const TemplateMoviePage = ({ movie, children }) => {
  // Use the useQuery hook to fetch movie images
  const { data, error, isLoading, isError } = useQuery(
    ["images", { id: movie.id }],
    getMovieImages
  );

  // If loading, show the Spinner component
  if (isLoading) {
    return <Spinner />;  // {/* Loading spinner */}
  }

  // If an error occurs, display the error message
  if (isError) {
    return <h1>{error.message}</h1>;  // {/* Error message */}
  }

  const images = data.posters;  // Store movie images from the API response

  return (
    <>
      {/* MovieHeader: Displays movie details such as title and description */}
      <MovieHeader movie={movie} />

      {/* Grid container for movie images and children components */}
      <Grid container spacing={5} style={{ padding: "15px" }}>
        
        {/* Grid for displaying movie images */}
        <Grid size={{ xs: 3 }}>
          <div
            sx={{
              display: "flex",  // {/* Flexbox for layout */}
              flexWrap: "wrap",  // {/* Wrap images within the container */}
              justifyContent: "space-around",  // {/* Distribute images evenly */}
            }}
          >
            {/* ImageList to render the images in a grid */}
            <ImageList
              sx={{
                height: "100vh",  // {/* Full viewport height for the image grid */}
              }}
              cols={1}  // {/* Only 1 column of images */}
            >
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  {/* Image item for each image */}
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}  // {/* Image source URL */}
                    alt={image.poster_path}  // {/* Alt text for the image */}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        {/* Grid for rendering children components */}
        <Grid size={{ xs: 9 }}>
          {children}  {/* Render any children passed to this component */}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;  // Export the component for use in other parts of the app
