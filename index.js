const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { connect } = require('mongoose');
const dotenv = require('dotenv');
const GraphQLSchema = require('./schema/index');
const GraphQLResolvers = require('./resolvers/index');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategyOptions = require('./OAuth/SocialOptions/facebookOptions');
const GoogleStrategyOptions = require('./OAuth/socialOptions/googleOptions');
const FacebookCallback = require('./OAuth/socialCallbacks/facebookCallback');
const GoogleCallback = require('./OAuth/socialCallbacks/googleCallback');
const cors = require('cors');
dotenv.config();
//Facebook strategy
passport.use(new FacebookStrategy(FacebookStrategyOptions, FacebookCallback));
// Google Strategy
passport.use(new GoogleStrategy(GoogleStrategyOptions, GoogleCallback));
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passport.serializeUser((user, cb) => {
  return cb(null, user.id);
});
passport.deserializeUser((user, cb) => {
  return cb(null, user);
});

app.use(
  '/api/graphql',
  graphqlHttp({
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true
  })
);
//Facebook strategy
app.get(
  '/auth/facebook',
  passport.authenticate('facebook', { scope: ['profile', 'email'] })
);
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: 'http://localhost:8000/api/graphql',
    failureRedirect: 'http://localhost:8000/api/graphql'
  })
);
// Google Strategy
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/plus.profiles.read',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: 'http://localhost:8000/api/graphql',
    failureRedirect: 'http://localhost:8000/api/graphql'
  })
);
connect(process.env.database, () => {
  console.log('connected');
});
const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
