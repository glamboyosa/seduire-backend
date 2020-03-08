const stripeKey = require('../stripe');
const stripe = require('stripe')(stripeKey);
const calculateOrderAmount = require('../helpers/calculateAmount');
module.exports = {
  processTransaction: async ({ amount, currency }) => {
    try {
      // hardcode amount & currency rn, change it later
      // const amount= calculateOrderAmount(amount);
      // for reasons unbeknowst to me Stripe interprets 200 as 2.00 so maybe add two zeros
      console.log(process.env.testSecretAPIKey);
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
