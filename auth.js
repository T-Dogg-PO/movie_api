// This is the same secret key used in JWTStrategy (see passport.js)
const jwtSecret = 'your_jwt_secret';

// Import required modules
const jwt = require('jsonwebtoken'),
    passport = require('passport');

// Import local passport file
require('./passport');

// Function for generating JWT based on the user details
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        // Username that's being encoded in JWT
        subject: user.Username,
        // Specifies when this token will expire (in this case, 7 days)
        expiresIn: '7d',
        // Algorithm used to encode values of the JWT
        algorithm: 'HS256'
    });
}

// POST login
// Checks that username and password in the body of the request exist in the database
// If they do then create a JWT and send that back as a response to the client
module.exports = (router) => {
    router.post('/login', (req, res) => {
        passport.authenticate('local', { session: false }, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right',
                    user: user
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                let dataRetuned = {Username: user.Username, Email: user.Email}
                return res.json({ dataRetuned, token });
            });
        })(req, res);
    });
}