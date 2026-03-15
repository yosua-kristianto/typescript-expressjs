import MobileUser from '@model/entity/MobileUser';
import {CreateUserDTO} from '@api/user/request/CreateUserDTO';

export interface IUserRepository {
  
  /**
   * findUserById
   *  A repository to find user data by id.
   * 
   * @param number id
   * 
   * @return /model/entity/User
   */
  findUserById(id: number): Promise<MobileUser>;

  /**
   * getAllUser
   *  A repository to get all user data.
   * 
   * @return Array<User>
   */
  getAllUser(): Promise<MobileUser[]>;

  /**
   * createUser
   *  A repository to create new User by
   *  designed DTO.
   * 
   * @return User
   */
  createUser(request: CreateUserDTO): Promise<MobileUser>;

}