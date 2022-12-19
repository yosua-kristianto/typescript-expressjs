import {Response} from 'express';

export class BaseResponse {
  public status: boolean = false;
  public code: string = "500";
  public message: string = "Internal Server Error";
  public data!: any;

  /**
   * ok
   *  A static function that return BaseResponse as successful response.
   */
  static ok(data: any, message: string, res: Response, code: string = "200"): Response {
    const baseResponse = new BaseResponse();

    baseResponse.status = true;
    baseResponse.code = code;
    baseResponse.message = message;
    baseResponse.data = data || null;

    return res
            .status(200)
              .json((
                baseResponse
              ));
  }

  /**
   * error
   *  A static function that return BaseResponse as not okay response.
   *  Oftenly used for Internal Server Error.
   */
  static error(message: string, res: Response, code: string = "500", data?: any | null): Response {
    const baseResponse = new BaseResponse();

    baseResponse.status = false;
    baseResponse.code = code;
    baseResponse.message = message;
    baseResponse.data = data || null;

    if (process.env.APP_DEBUG == "true") {
      console.log(res);
    }

    return res
            .status(500)
              .json((
                baseResponse
              ));
  }

  /**
   * custom
   *
   * A static function that return BaseResponse for custom purpose.
   *
   * @param status
   * @param code
   * @param message
   * @param data
   */
  static custom(status: boolean, code: string, message: string, data?: any | null): BaseResponse {
    const baseResponse = new BaseResponse();

    baseResponse.status = status;
    baseResponse.code = code;
    baseResponse.message = message;
    baseResponse.data = data;

    return baseResponse;
  }
}
