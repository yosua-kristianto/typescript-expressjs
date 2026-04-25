/**
 * @author https://github.com/CuaMcCarsaree44
 * @since January, 10/01/2023 2023 15:57:54
 *
 * JWTPayload
 *
 * This DTO used to be encrypted as JWT for authentication token
 */
export interface JWTPayload {
  "user_id": string;
  "username": string;
  "identity": {
    "token_expirity": string;
    "permission": Array<any>;
  };
}