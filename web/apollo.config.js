module.exports = {
  client: {
    service: {
      name: "post-gallery",
      url: "http://localhost:4000/graphql",
    },
    excludes: ["**/generated/**", "graphql.schema.json"],
  },
};
