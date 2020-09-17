import { Resolvers } from '../generated/graphql';

const categoryResolvers: Resolvers = {
  Query: {
    categories: (parent, args, { dataSources }) =>
      dataSources.categoryAPI.findManyCategories(),
    category: (parent, { slug }, { dataSources }) =>
      dataSources.categoryAPI.findOneCategoryBySlug(slug),
  },
  Category: {
    posts: ({ slug }, args, { dataSources }) =>
      dataSources.postAPI.findPostConnection({ ...args, categorySlug: slug }),
  },
};

export default categoryResolvers;
