const User = require('../../models/user');
module.exports = async function(req, accessToken, refreshToken, profile, done) {
  try {
    const user = await User.findOne({ facebookId: profile.id });
    if (user) {
      done(null, user);
      return;
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(profile.token, salt);
    const newUser = new User({
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      facebookId: profile.id,
      password: hashedPassword
    });
    const token = newUser.generateAuthToken();
    req.token = token;
    await newUser.save();
    done(null, newUser);
  } catch (error) {
    throw new Error(`Error Message: ${error.message}`);
  }
};
