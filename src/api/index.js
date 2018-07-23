const merge = require('lodash/merge');

const users = require('./models/users');
const expenses = require('./models/expenses');
const accounts = require('./models/accounts');
const tags = require('./models/tags');

module.exports = {
  typeDefs: [
    users.typeDefs,
    expenses.typeDefs,
    accounts.typeDefs,
    tags.typeDefs
  ].join(' '),
  resolvers: merge(
    {},
    users.resolvers,
    expenses.resolvers,
    accounts.resolvers,
    tags.resolvers
  ),
  context: {
    models: {
      users: users.model,
      expenses: expenses.model,
      accounts: accounts.model,
      tags: tags.model
    }
  }
};
