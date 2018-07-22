const merge = require('lodash/merge');

// const accounts = require('./accounts');
const expenses = require('./models/expenses');
const users = require('./models/users');

module.exports = {
  typeDefs: [users.typeDefs, expenses.typeDefs].join(' '),
  resolvers: merge({}, users.resolvers, expenses.resolvers),
  context: {
    models: {
      expenses: expenses.model,
      users: users.model
    }
  }
};
