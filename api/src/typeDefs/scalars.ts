import { gql } from 'apollo-server-express';

const scalarsSchema = gql`
  scalar Date
  scalar Cursor
`;

export default scalarsSchema;
