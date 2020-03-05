const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { connect } = require('mongoose');
const dotenv = require('dotenv');
const GraphQLSchema = require('./schema/index');
const GraphQLResolvers = require('./resolvers/index');
dotenv.config();
app.use(bodyParser.json());
app.use(
  '/api/graphql',
  graphqlHttp({
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true
  })
);
connect(process.env.database, () => {
  console.log('connected');
});
const port = 8000 || process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});