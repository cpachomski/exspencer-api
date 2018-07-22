const tags = async (_, args, ctx) => {
  const tags = await ctx.models.tags.getAllByUser(args.input);
  return tags;
};

const createTag = async (_, args, ctx) => {
  const newTag = await ctx.models.tags.create(args.input);
  return {
    id: newTag.insertId
  };
};

const updateTag = async (_, args, ctx) => {
  const updatedTag = await ctx.models.tags.updateOne(args.input);
  return updatedTag;
};

const deleteTag = async (_, args, ctx) => {
  const deletedTag = await ctx.models.tags.deleteOne(args.input);
  return deletedTag;
};

module.exports = {
  Query: {
    tags
  },
  Mutation: {
    createTag,
    updateTag,
    deleteTag
  },
  Tag: {
    createdAt(tag) {
      return tag.created_at;
    },
    updatedAt(tag) {
      return tag.updated_at;
    },
    userId(tag) {
      return tag.user_id;
    }
  }
};
