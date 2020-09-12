import { gql } from 'apollo-server-micro';

const scalarsSchema = gql`
  scalar Date
  scalar Cursor
`;

export default scalarsSchema;
