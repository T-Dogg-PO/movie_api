// Import Express and morgan
const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');

const app = express();

app.use(bodyParser.json());

// Set up logging using morgan
app.use(morgan('common'));

// Sample data for top movies
let topMovies = [
    {
        title: "Lord of the Rings",
        genre: "Fantasy"
    },
    {
        title: "Star Wars",
        genre: "Sci-Fi"
    },
    {
        title: "Back to the Future",
        genre: "Sci-Fi"
    },
    {
        title: "Gladiator",
        genre: "Fantasy"
    },
    {
        title: "Pokemon: The Movie",
        genre: "Kids"
    }
];

// Serve static files from the public folder (at this stage, specifically for documentation.html)
app.use(express.static('public'));

// GET route for the default endpoint "/"
app.get('/', (req, res) => {
    res.send('This is my movies page!');
});

// GET route for endpoint /movies - will return a list of all movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// GET route for endpoint /movies/:title - will return detailed data about a specific movie by title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => {
        return movie.title === req.params.title;
    }));
});

// GET route for endpoint /movies/:genre - will return detailed data about a movie genre by genre name
app.get('/movies/genres/:genre', (req, res) => {
    res.send('Successful GET request, this will return details about a genre of movies');
});

// GET route for endpoint /movies/:director - will return detailed data about a director by name
app.get('/movies/directors/:director', (req, res) => {
    res.send('Successful GET request, this will return details about the specified director');
});

// POST route for endpoint users/:user - will allow a new user to register
app.post('/users/:user', (req, res) => {
    res.send('Successful POST request, this will create a new user in the database!');
});

// PUT route for endpoint users/:user - will allow a user to update their username
app.put('/users/:user', (req, res) => {
    res.send('Successful PUT request, this will update the username of an existing user');
});

// POST route for endpoint users/:user/favourites/:movie - will allow a user to add a movie to their list of favourites by movie title
app.post('/users/:user/favourites/:movie', (req, res) => {
    res.send('Successful POST request, this will add the specified movie to this users favourites list.');
});

// DELETE route for endpoint users/:user/favourites/:movie - will allow a user to remove a movie from their list of favourites by movie title
app.delete('/users/:user/favourites/:movie', (req, res) => {
    res.send('Successful DELETE request, this will remove a movie from this users favourites list.');
});

// DELETE route for endpoint users/:user - will allow a user to deregister
app.delete('/users/:user', (req, res) => {
    res.send('Successful DELETE request, this will remove a user from the database');
});

// Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen on port 8080
app.listen(8080, () => {
    console.log('My app is listening on port 8080');
});