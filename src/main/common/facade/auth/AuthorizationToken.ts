import jwt from 'jsonwebtoken';
import {Request} from "express";
import {JWTPayload} from "./JWTPayload";
import { ErrorHandler } from 'cuakx-express-core/config';

// import {ErrorHandler} from "../../../config/Exception";

/**
 * @author https://github.com/CuaMcCarsaree44
 * @since January, 06/01/2023 2023 15:48:54
 *
 * AuthorizationToken
 *
 * This facade contains all Authorization token related
 * configuration and preparation.
 */
export class AuthorizationToken {

  /**
   * @static
   * @var string EXPIRATION_TIME
   *
   * This value contains expiration time setting
   * for Token Expiration.
   *
   * @link https://github.com/auth0/node-jsonwebtoken#readme
   */
  static EXPIRATION_TIME_VARIABLE = 7;
  static EXPIRATION_TIME_TYPE = "d";

  private static checkTokenValidity(bearer: string): string {

    try{
      const token = bearer.split(' ');

      if(token[0] == 'Bearer' && token[1]){
        return token[1];
      }

      throw new Error("Invalid token");

    }catch(err) {
      throw new InvalidTokenException();
    }
  }

  /**
   * getMeV2
   *
   * This function replace the current getMe.
   * No more memcache usage. Just token plays.
   *
   * @param request
   */
   public static decodeJWT(request: Request): JWTPayload {
    const token: string = this.checkTokenValidity(request.headers.authorization!);
    const payload: JWTPayload = jwt.verify(token, process.env.JWT_SECRET!) as any

    if(new Date(payload.identity.token_expirity).getTime() < new Date().getTime()){
      throw new InvalidTokenException()
    }

    return payload;
  }
}


/**
 * @author https://github.com/CuaMcCarsaree44
 * @since January, 06/01/2023 2023 19:20:12
 *
 * InvalidTokenException
 */
class InvalidTokenException extends ErrorHandler {

  constructor(){
    super(
      "UAM0001",
      "Invalid access token."
    );
  }

}