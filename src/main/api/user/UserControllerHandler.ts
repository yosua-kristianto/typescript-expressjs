import {CreateUserDTO} from "./request/CreateUserDTO";
import UserRepository from "../../repository/UserRepository";
import MobileUser from "../../model/entity/MobileUser";

export class UserHandler {

  /**
   * createUserHandler
   *
   * This function will handle User Creation.
   *
   * @param email
   * @param phone
   */
  public createUserHandler = async (
    email: string,
    phone: string
  ): Promise<MobileUser> => {
    const dto: CreateUserDTO = {
      "email": email,
      "phone": phone
    };

    const newUser: MobileUser = await UserRepository.createUser(dto);

    return newUser;
  }

  /**
   * getUserByIdHandler
   *
   * This function will handle finding user by its ID.
   *
   * @param id
   */
  public getUserByIdHandler = async (id: number): Promise<MobileUser> => {
    const user: MobileUser = await UserRepository.findUserById(id);

    return user;
  }

}