const { Schema, model } = require('mongoose');
const { cart } = require('./item');
const jwt = require('jsonwebtoken');
const schema = new Schema({
  email: {
    type: String,
    required: true,
    min: 10,
    max: 256
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  facebookId: String,
  googleId: String,
  password: {
    type: String,
    required: true,
    min: 5,
    max: 256
  },
  cart: [
    {
      type: cart
    }
  ]
});
schema.methods.generateAuthToken = function() {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.jwtPrivateKey,
    {
      expiresIn: '1h'
    }
  );
};
module.exports = model('User', schema);
