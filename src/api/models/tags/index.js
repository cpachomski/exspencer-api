module.exports = {
  resolvers: require('./resolvers.js'),
  typeDefs: require('../../util/gqlFileLoader')('tags/schema.graphql')
};
