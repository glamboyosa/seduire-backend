const dotenv = require('dotenv').config();
module.exports = {
  clientID: process.env.facebookAppID,
  clientSecret: process.env.facebookClientSecret,
  callbackURL: 'http://localhost:8000/auth/facebook/callback',
  passReqToCallback: true,
  profileFields: ['id', 'email', 'first_name', 'last_name', 'token']
};
