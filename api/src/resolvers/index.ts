import { GraphQLScalarType, Kind } from 'graphql';
import { UserInputError } from 'apollo-server-express';
import { Resolvers } from '../generated/graphql';
import { DataSources } from '../dataSources';
import { Loaders } from '../loaders';

interface GQLContext {
  dataSources: DataSources;
  loaders: Loaders;
}

const resolvers: Resolvers<GQLContext> = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
  // Sample: {
  //   sampleImages: async (parent, args, { loaders }) => {
  //     const { sampleImageLoader } = loaders;
  //     // We are getting id of the "parent". (Which is a "Sample" basically).
  //     const { id } = parent;
  //     const sampleImages = await sampleImageLoader.load(id);
  //     return sampleImages;
  //   },
  //   location: async (parent, args, { loaders }) => {
  //     const { locationLoader, subLocationLoader } = loaders;
  //     const { subLocationId } = parent;
  //     const subLocation = await subLocationLoader.load(subLocationId);
  //     const { locationId } = subLocation;
  //     const location = await locationLoader.load(locationId);
  //     return location;
  //   },
  //   subLocation: async (parent, args, { loaders }) => {
  //     const { subLocationLoader } = loaders;
  //     const { subLocationId } = parent;
  //     const subLocation = await subLocationLoader.load(subLocationId);
  //     return subLocation;
  //   },
  //   componentType: async (parent, args, { loaders }) => {
  //     const { componentTypeLoader } = loaders;
  //     const { componentTypeId } = parent;
  //     const componentType = await componentTypeLoader.load(componentTypeId);
  //     return componentType;
  //   },
  // },
  Mutation: {
    // createSample: async (parent, { input }, { dataSources }) => {
    //   const { fileStorageAPI, sampleAPI } = dataSources;
    //   const { sampleImages } = input;
    //   // Checking if the "sampleImages" array is empty.
    //   if (!sampleImages.length) {
    //     throw new UserInputError(
    //       'Please attach at least 1 image to the sample.',
    //     );
    //   }
    //   // Storing the files.
    //   const uploadResults = await fileStorageAPI.uploadMultiple(sampleImages);
    //   // After we store the files, we create the "sample" instance.
    //   const sample = await sampleAPI.createSample({
    //     ...input,
    //     sampleImages: uploadResults,
    //   });
    //   return {
    //     success: true,
    //     message: 'Sample has been created successfully.',
    //     sample,
    //   };
    // },
    deletePost: async (parent, { id }, { dataSources }) => {
      const { postAPI } = dataSources;
      const deleted = await postAPI.deletePost(id);
      if (deleted) {
        return {
          success: true,
          message: 'Sample has been created successfully.',
        };
      }
      return {
        success: false,
        message: 'An error occured while deleting the sample.',
      };
    },
  },
  Post: {
    postFiles: ({ id }, args, { loaders }) =>
      loaders.postFileByPostIdLoader.load(id),
  },
  Query: {
    posts: (parent, args, { dataSources }) => dataSources.postAPI.getPosts(),
    post: (parent, { id }, { dataSources }) =>
      dataSources.postAPI.getPostById(id),
  },
  MutationResponse: {
    __resolveType: () => {
      // TODO: This __resolveType implementation will be fixed.
      // Need to check how to use it with TypeScript (or graphql-codegen).
      return null;
    },
  },
};

export default resolvers;
