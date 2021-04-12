import { gql } from 'apollo-server-micro';

const categorySchema = gql`
  extend type Query {
    categories: [Category!]!
    category(slug: String!): Category
  }

  type Category {
    id: ID!
    name: String!
    slug: String!
    posts(first: NonNegativeInt!, after: Cursor): PostConnection!
  }
`;

export default categorySchema;
