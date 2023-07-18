import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/CustomError';
import logger from '../utils/logger';
import { httpStatusCode } from '../types/httpStatusCode';

export const ErrorMiddleware = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode= err.statusCode || httpStatusCode.INTERNAL_SERVER_ERROR;
  err.message = err.message || 'Internal server Errors';
  const BAD_REQUEST = httpStatusCode.BAD_REQUEST;
  switch (err.name) {
    case 'CastError':
      err.message =
        process.env.NODE_ENV === 'production'
          ? `Invalid ${err.stringValue}`
          : `Invalid ${err.stringValue} of  ${err.kind} for ${err.path} `;
      err = new CustomError(err.message, BAD_REQUEST);
      break;
    case 'JsonWebTokenError':
      err.message = `Json Web Token is invalid, Try again `;
      err.statusCode = httpStatusCode.UNAUTHORIZED;
      break;
    case 'TokenExpiredError':
      err.message = 'Json Web Token is Expired, Try again ';
      err.statusCode = httpStatusCode.UNAUTHORIZED;
      break;
    default:
      break;
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(err.statusCode).json({
    error: err.message,
  });
};

export default ErrorMiddleware;
