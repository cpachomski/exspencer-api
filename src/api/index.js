const merge = require('lodash/merge');

const tags = require('./models/tags');
const expenses = require('./models/expenses');
const users = require('./models/users');

module.exports = {
  typeDefs: [users.typeDefs, expenses.typeDefs, tags.typeDefs].join(' '),
  resolvers: merge({}, users.resolvers, expenses.resolvers, tags.resolvers),
  context: {
    models: {
      expenses: expenses.model,
      users: users.model,
      tags: tags.model
    }
  }
};
