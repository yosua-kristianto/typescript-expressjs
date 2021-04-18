import express, { Request, Response, NextFunction } from 'express';

const middleware = express();

/**
 * cors.ts
 *  This middleware contain 
 */

export default (req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );

  console.log('Middleware Running');

  if(req.method == 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST PUT');
    return res.status(200).json({});
  }

  next();
};