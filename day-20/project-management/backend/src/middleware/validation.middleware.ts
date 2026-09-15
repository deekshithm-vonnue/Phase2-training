import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

type RequestSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

function assignRequestProperty<T>(
  request: Request,
  property: "body" | "params" | "query",
  value: T,
) {
  Object.defineProperty(request, property, {
    value,
    configurable: true,
    writable: true,
    enumerable: true,
  });
}

export function validation(schemas: RequestSchemas) {
  return (request: Request, _response: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        assignRequestProperty(
          request,
          "body",
          schemas.body.parse(request.body),
        );
      }

      if (schemas.body) {
        assignRequestProperty(
          request,
          "params",
          schemas.body.parse(request.params),
        );
      }

      if (schemas.body) {
        assignRequestProperty(
          request,
          "query",
          schemas.body.parse(request.query),
        );
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return next(error);
      }
    }
  };
}
