module.exports = {
  resolvers: require('./resolvers.js'),
  typeDefs: require('../../util/gqlFileLoader')('users/schema.graphql'),
  model: require('./model')
};
