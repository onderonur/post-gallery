import { ValidationError } from 'class-validator';

export const getValidationErrorMessage = (errors: ValidationError[]) =>
  errors.map(error => error.toString()).join('');
