import process from "process";
import { Log } from "./logging";

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
    + `Exception origin: ${origin}\n\n`
  );
});