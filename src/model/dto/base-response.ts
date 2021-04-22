import { Response } from 'express';

export class BaseResponse<T> {
  public status: boolean = false;
  public code: number = 500;
  public message: string = "Internal Server Error";
  public data!: any;

  constructor(){

  }

  /**
   * ok
   *  A static function that return BaseResponse as successful response.
   */
  ok(data: T, message: string, res: Response, code: number = 200): Response{
    this.status = true;
    this.code = code;
    this.message = message;
    this.data = data || null;

    return res
            .status(200)
              .json((
                this
              ));
  }

  /**
   * error
   *  A static function that return BaseResponse as not okay response.
   *  Oftenly used for Internal Server Error.
   */
  error(message: string, res: Response, code: number = 500, data?: T): Response{
    this.status = false;
    this.code = code;
    this.message = message;
    this.data = data || null;

    console.log(res);

    return res
            .status(500)
              .json((
                this
              ));
  }
}
