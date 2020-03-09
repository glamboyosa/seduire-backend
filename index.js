const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { connect } = require('mongoose');
const dotenv = require('dotenv');
const GraphQLSchema = require('./schema/index');
const GraphQLResolvers = require('./resolvers/index');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth20');
const FacebookCallback = require('./OAuth/socialCallbacks/facebookCallback');
const GoogleCallback = require('./OAuth/socialCallbacks/googleCallback');
const cors = require('cors');
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});
console.log(process.env.facebookAppID);
app.use(
  '/api/graphql',
  graphqlHttp({
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true
  })
);
//Facebook strategy
const FacebookOptions = {
  clientID: '1029610910752384',
  clientSecret: '5d5eea358ab39f125ee46193ef42632d',
  callbackURL: 'http://localhost:8000/auth/facebook/callback',
  passReqToCallback: true,
  profileFields: ['id', 'email', 'first_name', 'last_name', 'token']
};
passport.use(new FacebookStrategy(FacebookOptions, FacebookCallback));
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
const GoogleOptions = {
  clientID:
    '767059472934-s7s2rfm1ck3auiq620h2amls0d1rucs9.apps.googleusercontent.com',
  clientSecret: 'NlNvTx6kCSq7B2_YLAog8jtG',
  callbackURL: 'http://localhost:8000/auth/google/callback',
  passReqToCallback: true,
  profileFields: ['id', 'email', 'first_name', 'last_name', 'token']
};
passport.use(new GoogleStrategy(GoogleOptions, GoogleCallback));
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
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
const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
