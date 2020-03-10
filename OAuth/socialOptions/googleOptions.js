const dotenv = require('dotenv').config();
module.exports = {
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: 'http://localhost:5000/auth/google/callback',
  passReqToCallback: true
};
