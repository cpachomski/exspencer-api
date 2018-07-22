module.exports = {
	resolvers: require('./resolvers.js'),
	typeDefs: require('../../util/gqlFileLoader')('expenses/schema.graphql'),
	model: require('./model')
};
