import process from "process";
import {Log} from "./Logging";

import {Response} from 'express';
import {BaseResponse} from '../model/dto/BaseResponse';

/**
 * ErrorHandler
 *  An object to handle Exceptions that 
 *  shown on Api Response.
 */
export class ErrorHandler extends Error {

  statusCode: string;
  message: string;
  data?: any;

  constructor(statusCode: string, message: string, data?: any) {
    if(statusCode == "undefined"){
      message =  ((process.env.APP_DEBUG ?? "false") == "true") ? message : "Internal Server Error";
    }

    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;

    /**
     * You can put your error logger in here.
     */
  }

}

/**
 * This is where error being returned as response.
 */
export const handleError = (res: Response, err: ErrorHandler): Response => {
  Log.e("Unhandled Exception", JSON.stringify(err.stack));
  const { statusCode, message, data } = err;

  return BaseResponse.error(
    ((process.env.APP_DEBUG ?? "false") == "true" && statusCode != "undefined") ? message : "Internal Server Error",
    res,
    statusCode,
    (process.env.APP_DEBUG ?? "false") == "true" ? data : null
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
    + `Exception origin: ${JSON.stringify(origin)}\n\n`,
    __filename
  );
});