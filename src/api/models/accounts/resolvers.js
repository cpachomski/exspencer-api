const account = async (_, args, ctx) => {
  const account = await ctx.models.accounts.getOne(args.input);
  return account;
};

const accounts = async (_, args, ctx) => {
  const accounts = await ctx.models.accounts.getAllByUser(args.input);
  return accounts;
};

const createAccount = async (_, args, ctx) => {
  const newAccount = await ctx.models.accounts.create(args.input);
  return {
    id: newAccount.insertId
  };
};

const updateAccount = async (_, args, ctx) => {
  const updatedAccount = await ctx.models.accounts.updateOne(args.input);
  return updatedAccount;
};

const deleteAccount = async (_, args, ctx) => {
  const deletedAccount = await ctx.models.accounts.deleteOne(args.input);
  return deletedAccount;
};

module.exports = {
  Query: {
    accounts
  },
  Mutation: {
    createAccount,
    updateAccount,
    deleteAccount
  },
  Account: {
    createdAt(account) {
      return account.created_at;
    },
    updatedAt(account) {
      return account.updated_at;
    },
    userId(account) {
      return account.user_id;
    }
  }
};
