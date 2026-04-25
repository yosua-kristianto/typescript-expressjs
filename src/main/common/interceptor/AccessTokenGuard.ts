import {NextFunction, Request, Response} from "express";
import {AuthorizationToken} from "@common/facade/auth/AuthorizationToken";
import { BaseResponse, ResponseHTTPCode } from "cuakx-express-core/facade/response.util";

/**
 * Register all unguarded resources here
 */
const unguardedResources: Array<string> = [

];

export default async (request: Request, next: NextFunction) => {

  if(unguardedResources.includes(request.baseUrl + request.path)){
    /**
     * If the uri is registered in exception,
     * proceed to the resource.
     */

    next();
  }else {

    /**
     * If uri is not registered as unguarded resources,
     * check token validity
     */

    const response: BaseResponse = new BaseResponse();
    response.status = ResponseHTTPCode.UNAUTHORIZED;
    response.message = "Unauthorized.";
    response.code = "401";

    if(typeof request.headers.authorization == 'undefined'){
      return response;
    }else {
      const token = AuthorizationToken.decodeJWT(request);

      if(!token){
        return response;
      }

      next();
    }

  }
}