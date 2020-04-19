import { ValidationError } from 'class-validator';
import { getManager, ObjectLiteral } from 'typeorm';

export const getValidationErrorMessage = (errors: ValidationError[]) =>
  errors.map((error) => error.toString()).join('');

export const runRawSQL = async <T>(
  query: string,
  parameters: ObjectLiteral,
) => {
  const manager = getManager();
  const [
    escapedQuery,
    escapedParams,
  ] = manager.connection.driver.escapeQueryWithParameters(
    query,
    parameters,
    {},
  );

  const rows: T = await manager.query(escapedQuery, escapedParams);
  return rows;
};

export const unionAllQueries = (queries: string[]) => {
  return queries.map((query) => `(${query})`).join(' UNION ALL ');
};
