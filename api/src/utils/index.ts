import { ValidationError } from 'class-validator';

export const convertMBToBytes = (mb: number) => mb * 1024 * 1024;

export const getLastOfArray = <T>(array: T[]) => {
  if (array.length) {
    const { length, [length - 1]: last } = array;
    return last;
  }
  return null;
};

export const getValidationErrorMessage = (errors: ValidationError[]) =>
  errors.map(error => error.toString()).join('');
