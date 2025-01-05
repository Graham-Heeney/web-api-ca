import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';  // Importing CircularProgress from Material UI
import Box from '@mui/material/Box';  // Importing Box from Material UI for layout styling

export default function CircularIndeterminate() {
  return (
    <Box sx={{
        display: 'flex',  // Uses flexbox to layout the items in a row
        justifyContent: "center",  // Centers the items horizontally
        '& > * + *': {  // Applies the following style to all child elements that follow the first child
          marginLeft: '2em',  // Adds space of 2em between the CircularProgress elements
        }
    }}>
      <CircularProgress />  
      <CircularProgress />  
    </Box>
  );
}
