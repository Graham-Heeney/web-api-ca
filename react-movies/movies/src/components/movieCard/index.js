import React, { useContext } from "react"; // Import React and useContext to manage state
import Card from "@mui/material/Card"; // MUI Card component for displaying movie details
import CardActions from "@mui/material/CardActions"; // CardActions component for buttons and actions
import CardContent from "@mui/material/CardContent"; // Content section of the Card
import CardMedia from "@mui/material/CardMedia"; // Media section for movie poster
import CardHeader from "@mui/material/CardHeader"; // Header for movie title and favorite icon
import Button from "@mui/material/Button"; // Button component for "More Info" action
import Typography from "@mui/material/Typography"; // Typography for text styling
import FavoriteIcon from "@mui/icons-material/Favorite"; // Icon for favorite action
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone"; // Icon for release date
import StarRateIcon from "@mui/icons-material/StarRate"; // Icon for movie rating
import IconButton from "@mui/material/IconButton"; // IconButton for clickable icons
import Grid from "@mui/material/Grid"; // MUI Grid component for layout
import Avatar from '@mui/material/Avatar'; // Avatar component for favorite icon in header
import { MoviesContext } from "../../contexts/moviesContext"; // Import MoviesContext for managing favorites
import { Link } from "react-router-dom"; // Link component to navigate to movie details page
import img from '../../images/film-poster-placeholder.png'; // Placeholder image if movie poster is unavailable
import { useTheme } from "@mui/material/styles"; // Hook to access MUI theme

// MovieCard component to display movie details and allow adding to favorites
export default function MovieCard({ movie, action }) {
  const { favorites, addToFavorites } = useContext(MoviesContext); // Get favorites and addToFavorites from context
  const theme = useTheme(); // Access the theme for styling

  // Check if the movie is in the favorites list and mark it accordingly
  if (favorites.find((id) => id === movie.id)) {
    movie.favorite = true; // Mark as favorite if movie ID is found in favorites
  } else {
    movie.favorite = false; // Mark as not favorite otherwise
  }

  // Handle adding movie to favorites
  const handleAddToFavorite = (e) => {
    e.preventDefault();
    addToFavorites(movie); // Call addToFavorites function with the current movie
  };

  return (
    <Card
      sx={{
        maxWidth: 345, // Set maximum width of the card
        borderRadius: 2, // Rounded corners for the card
        boxShadow: 3, // Add shadow effect for card depth
        backgroundColor: theme.palette.primary.main, // Set background color from the theme
        margin: '12px', // Add margin around the card
        transition: 'transform 0.3s', // Smooth transition effect on hover
        '&:hover': { transform: 'scale(1.05)' }, // Scale card on hover
      }}
    >
      {/* Card Header containing the movie title and favorite icon if applicable */}
      <CardHeader
        avatar={
          movie.favorite ? (
            <Avatar sx={{ backgroundColor: 'red', width: 30, height: 30 }}>
              <FavoriteIcon fontSize="small" /> {/* Favorite icon in header */}
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h6" component="p" sx={{ fontWeight: 'bold', color: 'white' }}>
            {movie.title} {/* Display movie title */}
          </Typography>
        }
        sx={{
          backgroundColor: theme.palette.primary.main, // Match header background color with the theme
        }}
      />
      
      {/* Card Media section displaying the movie poster */}
      <CardMedia
        sx={{
          height: 400, // Set height for the poster image
          objectFit: 'cover', // Ensure the image covers the area without stretching
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` // Use movie poster if available
            : img // Use placeholder image if poster is unavailable
        }
      />
      
      {/* Card Content section displaying release date and rating */}
      <CardContent sx={{ backgroundColor: theme.palette.primary.main }}>
        <Grid container spacing={1}>
          {/* Release Date */}
          <Grid item xs={6}>
            <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
              {movie.release_date} {/* Display release date */}
            </Typography>
          </Grid>
          {/* Movie Rating */}
          <Grid item xs={6}>
            <Typography variant="body2" component="p" sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
              <StarRateIcon fontSize="small" sx={{ mr: 1 }} />
              {movie.vote_average} {/* Display movie rating */}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      {/* Card Actions section with "More Info" button and favorite button */}
      <CardActions disableSpacing sx={{ backgroundColor: theme.palette.primary.main }}>
        {action(movie)} {/* Render any additional action passed as a prop */}
        
        {/* Link to movie details page */}
        <Link to={`/movies/${movie.id}`}>
          <Button
            variant="contained" 
            size="medium"
            color="secondary"    
            sx={{
              color: 'white',       
              backgroundColor: 'rgba(255, 255, 255, 0.7)',  
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
              },
            }}
          >
            More Info ...
          </Button>
        </Link>

        {/* Favorite Button to add/remove movie from favorites */}
        <IconButton
          onClick={handleAddToFavorite}
          sx={{
            color: movie.favorite ? 'red' : 'white', // Change color based on favorite status
            '&:hover': { color: 'red' }, // Change color on hover
          }}
        >
          <FavoriteIcon /> {/* Favorite icon button */}
        </IconButton>
      </CardActions>
    </Card>
  );
}
