import { Resolvers } from '../generated/graphql';

const categoryResolvers: Resolvers = {
  Query: {
    categories: (parent, args, { dataSources }) =>
      dataSources.categoryAPI.findCategories(),
    category: (parent, { slug }, { dataSources }) =>
      dataSources.categoryAPI.findCategoryBySlug(slug),
  },
  Category: {
    posts: ({ slug }, args, { dataSources }) =>
      dataSources.postAPI.findPostConnection({ ...args, categorySlug: slug }),
  },
};

export default categoryResolvers;
