module.exports = {
  resolvers: require('./resolvers.js'),
  typeDefs: require('../../util/gqlFileLoader')('accounts/schema.graphql'),
  model: require('./model')
};
