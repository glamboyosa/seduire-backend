const User = require('../models/user');
const bcrypt = require('bcryptjs');
module.exports = {
  createUser: async ({ userInput }) => {
    try {
      const { firstName, lastName, email, password } = userInput;
      if (!/@/.test(email)) {
        throw new Error('Invalid email');
      }
      if (!firstName || firstName === '' || typeof firstName !== 'string') {
        throw new Error('Invalid firstName format');
      }
      if (!lastName || lastName === '' || typeof lastName !== 'string') {
        throw new Error('Invalid lastName format');
      }
      if (!password || password === '' || typeof password !== 'string') {
        throw new Error('Invalid password format');
      }
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const existingUser = User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }
      const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
      await user.save();
      user.password = null;
      return user;
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  },
  getSocialToken: (args, req) => {
    if (!req.token) {
      throw new Error('Token does not exist');
    }
    const token = (decoded = jwt.verify(token, process.env.jwtPrivateKey));
    console.log(token.exp);
    return {
      token: req.token,
      expDate: new Date(token.exp).toISOString()
    };
  }
};
