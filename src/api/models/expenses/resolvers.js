const expense = async (_, args, ctx) => {
  const expense = await ctx.models.expenses.getOne(args.input);
  return expense;
};

const expenses = async (_, args, ctx) => {
  const expenses = await ctx.models.expenses.getAllByUser(args.input);
  return expenses;
};

const createExpense = async (_, args, ctx) => {
  const newExpense = await ctx.models.expenses.create(args.input);
  return {
    id: newExpense.insertId
  };
};

const updateExpense = async (_, args, ctx) => {
  const updatedExpence = await ctx.models.expenses.updateOne(args.input);
  return updatedExpence;
};

const deleteExpense = async (_, args, ctx) => {
  const deletedExpense = await ctx.models.expenses.deleteOne(args.input);
  return deletedExpense;
};

module.exports = {
  Query: {
    expense,
    expenses
  },
  Mutation: {
    createExpense,
    updateExpense,
    deleteExpense
  },
  Expense: {
    createdAt(expense) {
      return expense.created_at;
    },
    updatedAt(expense) {
      return expense.updated_at;
    },
    userId(expense) {
      return expense.user_id;
    }
  }
};
