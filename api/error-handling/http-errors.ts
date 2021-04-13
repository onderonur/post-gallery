import { CustomError } from '@shared/CustomError';
import { HttpStatusCode } from '../../shared/HttpStatusCode';

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(HttpStatusCode.BAD_REQUEST, message);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(HttpStatusCode.UNAUTHORIZED, message);
  }
}

export class MethodNotAllowedError extends CustomError {
  constructor() {
    super(HttpStatusCode.METHOD_NOT_ALLOWED, 'Method Not Allowed');
  }
}

export class TooManyRequestsError extends CustomError {
  constructor() {
    super(HttpStatusCode.TOO_MANY_REQUESTS, 'Too many requests');
  }
}
