/**
 * @author https://github.com/CuaMcCarsaree44
 * @since January, 05/01/2023 2023 15:45:54
 *
 * UserToken
 *
 * This model contains relation to `uma_mem_user_token`
 */
export class UserToken {

  public static tableName = 'uma_mem_user_token';

  /**
   * public_token
   *
   * @var string
   *
   * This attribute act as public token that returned to client as
   * representation to the jwt.
   */
  public public_token!: string;

  /**
   * user_id
   *
   * @var string
   *
   * This attribute contains user_id that linked into this token.
   */
  public user_id!: string;

  /**
   * jwt
   *
   * @var string
   *
   * This attribute act as private token that store user id.
   */
  public jwt!: string;

  /**
   * issued_at
   *
   * @var Date
   *
   * This attribute act as expiration date of this token.
   */
  public expired_at!: string;
}