const User = require('../models/user');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
module.exports = {
  login: async ({ email, password }) => {
    try {
      if (!/@/.test(email)) {
        throw new Error('Invalid email');
      }
      if (!password || password === '' || typeof password !== 'string') {
        throw new Error('Invalid password format');
      }
      const existingUser = await User.findOne({ email });
      if (!existingUser) {
        throw new Error('User does not exist');
      }
      const isExisting = await bcrypt.compare(password, existingUser.password);
      if (!isExisting) {
        throw new Error('Invalid login credentials');
      }
      const token = existingUser.generateAuthToken();
      const decoded = jwt.verify(token, process.env.jwtPrivateKey);
      return {
        firstName: existingUser.firstName,
        token,
        exp: decoded.exp,
        expDate: new Date(decoded.exp).toISOString()
      };
    } catch (error) {
      throw new Error(`Error Message: ${error.message}`);
    }
  },
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
      const existingUser = await User.findOne({ email });
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
  }
};
