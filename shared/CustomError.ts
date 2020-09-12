// https://github.com/zeit/micro#error-handling
export class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message); // 'Error' breaks prototype chain here
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
