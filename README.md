# Assignment 2 - Web API.

Name: Graham Heeney

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Log in 
 + Register 
 + Log out  
 + Protected route

## Setup requirements.

npm install
npm install --save mongoose

## API Configuration

A .env file was created

______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=
TMDB_KEY=

______________________



## Security and Authentication


Validation for passwords created. Top Rated movies can only be seen from a logged in user.


## Independent learning (if relevant)

I leanred how to validate passwords and make them require certain inputs.
https://www.w3resource.com/javascript/form/password-validation.php#:~:text=To%20check%20a%20password%20between%208%20to%2015%20characters%20which

i learned how to implement protected routes by altering this guide to suit my code
https://dev.to/collins87mbathi/reactjs-protected-route-m3j