const user = async (_, args, ctx) => {
  const user = await ctx.models.users.getOne(args.input);
  return user;
};

const users = async (_, args, ctx) => {
  const users = await ctx.models.users.getAll();
  return users;
};

const createUser = async (_, args, ctx) => {
  const newUser = await ctx.models.users.create(args.input);
  return {
    id: newUser.insertId
  };
};

const updateUser = async (_, args, ctx) => {
  const updatedUser = await ctx.models.users.updateOne(args.input);
  return updatedUser;
};

const deleteUser = async (_, args, ctx) => {
  const deletedUser = await ctx.models.users.deleteOne(args.input);
  return deletedUser;
};

module.exports = {
  Query: {
    user,
    users
  },
  Mutation: {
    createUser,
    updateUser,
    deleteUser
  },
  User: {
    createdAt(user) {
      return user.created_at;
    },
    updatedAt(user) {
      return user.updated_at;
    },
    authProvider(user) {
      return user.auth_provider;
    }
  }
};
