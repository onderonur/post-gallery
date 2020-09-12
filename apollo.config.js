module.exports = {
  client: {
    service: {
      name: 'post-gallery',
      localSchemaFile: 'graphql.schema.json',
    },
    excludes: ['**/generated/**', '**/gql/**'],
  },
};
