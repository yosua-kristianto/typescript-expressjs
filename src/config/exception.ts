import process from "process";
import { Log } from "./logging";

import { Response } from 'express';
import { BaseResponse } from '../model/dto/base-response';

/**
 * ErrorHandler
 *  An object to handle Exceptions that 
 *  shown on Api Response.
 */
export class ErrorHandler extends Error {

  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

}

/**
 * This is where error being returned as response.
 */
export const handleError = (res: Response, err: any): void => {
  Log.e("Unhandled Exception", err);
  const { statusCode, message } = err;

  new BaseResponse()
        .error(
          message,
          res,
          statusCode
  );
}

/**
 * exception.ts
 *  This file contains the uncaught exception reporting
 *  configuration. How the uncaught exception reporting is
 *  should be react when Run Time Error is thrown.  
 */

export default process.on('uncaughtException', (err: any, origin: any) => {
  Log.e(
    "UNCAUGHT EXCEPTION", 
    `Caught exception: ${err}\n`
    + `Exception origin: ${JSON.stringify(origin)}\n\n`
  );
});