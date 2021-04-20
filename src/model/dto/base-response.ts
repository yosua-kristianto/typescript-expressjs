import { Response } from 'express';

export class BaseResponse {
  public status: boolean = false;
  public code: number = 500;
  public message: string = "Internal Server Error";
  public data?: any = null;

  constructor(data: any, message: string, code: number) {
    this.status = (code > 99 || code < 400);
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * @static 
   * ok
   *  A static function that return BaseResponse as successful response.
   */
  static ok(data: any, message: string, res: Response, code: number = 200): Response{
    return res
            .status(200)
              .json((
                  new BaseResponse(
                    data,
                    message,
                    code
                  )
              ));
  }

  /**
   * @static 
   * error
   *  A static function that return BaseResponse as not okay response.
   *  Oftenly used for Internal Server Error.
   */
  static error(message: string, res: Response, code: number = 200, data?: any): Response{
    return res
            .status(500)
              .json((
                  new BaseResponse(
                    data,
                    message,
                    code
                  )
              ));
  }
}
