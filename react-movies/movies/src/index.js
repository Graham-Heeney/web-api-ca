import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import TopRatedMovies from "./pages/topRatedMoviesPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import Signup from "./pages/signupPage";
import Login from "./pages/loginPage";
import NowPlayingMovies from './pages/nowPlayingPage';

// Create the query client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000, // Data is considered fresh for 6 minutes (360,000 ms)
      refetchInterval: 360000, // Refetch interval is 6 minutes
      refetchOnWindowFocus: false, // Disable refetching when the window is focused
    },
  },
});

const App = () => {
  return (
    // Wrapping the app in the QueryClientProvider to use React Query throughout
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* Header component that likely includes navigation links */}
        <SiteHeader />
        
        {/* Providing movie context state management to the entire app */}
        <MoviesContextProvider>
          <Routes>
            {/* Route for the Favorite Movies Page */}
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            
            {/* Route for viewing the movie review page based on movie ID */}
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            
            {/* Route for viewing individual movie details */}
            <Route path="/movies/:id" element={<MoviePage />} />
            
            {/* Home page route */}
            <Route path="/" element={<HomePage />} />
            
            {/* Catch-all route that redirects to the home page for unmatched paths */}
            <Route path="*" element={<Navigate to="/" />} />
            
            {/* Route for adding a movie review */}
            <Route path="/reviews/form" element={<AddMovieReviewPage />} />
            
            {/* Route for the Top Rated Movies Page */}
            <Route path="/movies/top-rated" element={<TopRatedMovies />} />
            
            {/* Route for the Signup Page */}
            <Route path="/signup" element={<Signup />} />
            
            {/* Route for the Login Page */}
            <Route path="/login" element={<Login />} />
            
            {/* Route for the Now Playing Movies Page */}
            <Route path="/movies/now-playing" element={<NowPlayingMovies />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      
      {/* React Query DevTools to inspect queries and mutations in development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

// Creating the root of the React app and rendering it
const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
