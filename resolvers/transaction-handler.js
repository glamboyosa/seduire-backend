const dotenv = require('dotenv').config();
const stripeKey = require('../stripe');
const stripe = require('stripe')(process.env.stripeSecretKey);
const calculateOrderAmount = require('../helpers/calculateAmount');
module.exports = {
  processTransaction: async ({ amount, currency },req) => {
    try {
      if(!req.isAuth){
        throw new Error("No access.")
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(amount),
        currency,
        metadata: { integration_check: 'accept_a_payment' }
      });
      return {
        publishableKey: process.env.stripePublishableKey,
        clientSecret: paymentIntent.client_secret
      };
    } catch (error) {
      throw new Error(`Error message: ${error.message}`);
    }
  }
};
