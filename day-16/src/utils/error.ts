export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(401, "UNAUTHORIZED", message);
  }
}

export class ToManyRequestError extends AppError {
  public readonly retrtAfter?: number;
  constructor(
    message = "Too many requests. Please try again later",
    retryAfter?: number,
  ) {
    super(429, "REQUESET_EXCEEDED", message);
    this.retrtAfter = retryAfter;
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(403, "FORBIDEEN", message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super(401, code, message);
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(409, code, message);
  }
}
export class BadRequestError extends AppError {
  constructor(code: string, message: string) {
    super(400, code, message);
  }
}
