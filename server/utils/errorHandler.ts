export interface ErrorsObject {
  value: {
    message: string;
  };
}

class ErrorHandler extends Error {
  statusCode: number;
  path: string;
  errors: ErrorsObject;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.path = "";
    this.errors = { value: { message: "" } };

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
