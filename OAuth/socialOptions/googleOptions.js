module.exports = {
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  callbackURL: 'http://localhost:8000/auth/google/callback',
  passReqToCallback: true,
  profileFields: ['id', 'email', 'first_name', 'last_name', 'token']
};
