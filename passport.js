// Import modules needed for authentication 
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Models = require('./models.js'),
    passportJWT = require('passport-jwt');

// Declare variables for module functionality
let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

// Passport strategy for HTTP authentication (initial login)
passport.use(new LocalStrategy({
    // Take username and password from the body of the request
    usernameField: 'Username',
    passwordField: 'Password'
}, (username, password, callback) => {
    console.log(username + ' ' + password);
    // Use  Mongoose to check database for matching user (just username at this stage)
    Users.findOne({ Username: username }, (error, user) => {
        if (error) {
            console.log(error);
            return callback(error);
        }

        if (!user) {
            console.log('incorrect username');
            return callback(null, false, {message: 'Incorrect username or password.'});
        }

        // If match is found without errors, the callback function for the login endpoint will be executed
        console.log('finished');
        return callback(null, user);
    });
}));

// Passport strategy for JWT authentication
passport.use(new JWTStrategy({
    // JWT is extracted from header (this is the bearer token)
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    // Secret key for verifying signature of JWT
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id).then((user) => {
        return callback(null, user);
    }).catch((error) => {
        return callback(error)
    });
}));