const stripeKey = require('../stripe');
const stripe = require('stripe')(stripeKey);
const calculateOrderAmount = require('../helpers/calculateAmount');
module.exports = {
  processTransaction: async ({ amount, currency }) => {
    try {
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
