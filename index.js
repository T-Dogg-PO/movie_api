// Import Express and morgan
const express = require('express'),
    morgan = require('morgan');
const app = express();

// Set up logging using morgan
app.use(morgan('common'));

// Sample data for top movies
let topMovies = [
    {
        title: "Lord of the Rings"
    },
    {
        title: "Star Wars"
    }
];

// GET route for the default endpoint "/"
app.get('/', (req, res) => {
    res.send('This is my movies page!');
});

// GET route for endpoint /movies
app.get('/movies', (req, res) => {
    res.json(topMovies);
});

// Serve static files from the public folder (at this stage, specifically for documentation.html)
app.use(express.static('public'));

// Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Listen on port 8080
app.listen(8080, () => {
    console.log('My app is listening on port 8080');
});