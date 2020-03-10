const User = require('../../models/user');
const bcrypt = require('bcryptjs');
module.exports = async (req, accessToken, refreshToken, profile, done) => {
  try {
    console.log(profile);
    const user = await User.findOne({ googleId: profile.id });
    if (user) {
      done(null, user);
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(profile.token, salt);
    const newUser = new User({
      email: profile.emails[0].value,
      firstName: profile.name.displayName.split(' ')[0].join(''),
      lastName: profile.name.familyName,
      googleId: profile.id,
      password: hashedPassword
    });
    const token = newUser.generateAuthToken();
    req.token = token;
    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.log(`Error Message: ${error}`);
    throw new Error(`Error Message: ${error.message}`);
  }
};
