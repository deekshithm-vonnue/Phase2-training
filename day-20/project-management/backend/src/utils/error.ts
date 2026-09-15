export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
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

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(403, "FORBIDDEN", message);
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(409, code, message);
  }
}

export class NotFoundError extends AppError {
  constructor(code: string, message: string) {
    super(404, code, message);
  }
}

export class ToManyRequest extends AppError {
  constructor(message = "Too many request send to server") {
    super(429, "TO_MANY_REQUEST", message);
  }
}

export class BadRerquest extends AppError {
  constructor(code: string, message: string) {
    super(400, code, message);
  }
}
