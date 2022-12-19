import User from '../model/entity/User';
import {CreateUserDTO} from '../model/dto/request/CreateUserDTO';

export interface UserRepository {
  
  /**
   * findUserById
   *  A repository to find user data by id.
   * 
   * @param number id
   * 
   * @return /model/entity/User
   */
  findUserById(id: number): Promise<User>;

  /**
   * getAllUser
   *  A repository to get all user data.
   * 
   * @return Array<User>
   */
  getAllUser(): Promise<User[]>;

  /**
   * createUser
   *  A repository to create new User by
   *  designed DTO.
   * 
   * @return User
   */
  createUser(request: CreateUserDTO): Promise<User>;

}