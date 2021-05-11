// Import Mongoose
const mongoose = require('mongoose');

// Set up movieSchema structure
let movieSchema = mongoose.Schema({
    // Title is a string, required
    Title: {type: String, required: true},
    // Description is a string, required
    Description: {type: String, required: true},
    // Genre has two parameters, Name string and Description string. None required
    Genre: {
        Name: String,
        Description: String
    },
    // Director has four parameters, Name string, Bio string, Birth and Death dates . None required
    Director: {
        Name: String,
        Bio: String,
        Birth: Date,
        Death: Date
    },
    // Actors is an array of strings
    Actors: [String],
    // ImagePath is a string
    ImagePath: String,
    // Featured is a Boolean
    Featured: Boolean
});

// Set up userSchema structure
let userSchema = mongoose.Schema({
    // Username is a string, required
    Username: {type: String, required: true},
    // Password is a string, required
    Password: {type: String, required: true},
    // Email is a strong, required
    Email: {type: String, required: true},
    // Birthday is a date field, optional
    Birthday: Date,
    // FavouriteMovies is an array of ID references to the db.movies collection through the ref:'Movie' field
    FavouriteMovies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }]
});

// Create the movies and users models. These names will be converted to lowercase and plural automatically
let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

// Export the models so they can be used in index.js
module.exports.Movie = Movie;
module.exports.User = User;