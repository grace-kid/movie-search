const express = require('express');
const { Pool } = require('pg'); // Use pg package for PostgreSQL
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files (for CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to parse cookies
app.use(cookieParser());

// PostgreSQL connection

    



app.get('/', (req ,res) => {
  res.render('index');
});


app.post('/movie',async (req ,res) => {
    const { title , date } = req.body ;
    const apikey = process.env.OMDB_API_KEY ;
    try {
      const response = await axios.get(`http://www.omdbapi.com/?t=${encodeURIComponent(title)}&y=${date}&apikey=${apikey}`);
      const movies = response.data;
      console.log(movies);
      res.render('resut',{movie: movies});
    } catch (error) {
      console.error(error);
      res.render('resut', { movies:null});
      
    }
});










// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
