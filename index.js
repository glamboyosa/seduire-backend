const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { connect } = require('mongoose');
const dotenv = require('dotenv');
const GraphQLSchema = require('./schema/index');
const GraphQLResolvers = require('./resolvers/index');
const AuthMiddleware = require('./middleware/isAuth');
const cors = require('cors');
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(AuthMiddleware);
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
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
module.exports = server;
