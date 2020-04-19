import { gql } from 'apollo-server-express';

const viewerSchema = gql`
  extend type Query {
    viewer: User
  }
`;

export default viewerSchema;
