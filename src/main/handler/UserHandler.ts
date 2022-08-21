import User from "../model/entity/User";
import {CreateUserDTO} from "../model/dto/request/CreateUserDTO";
import UserRepositoryImpl from "../repository/impl/UserRepositoryImpl";

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
    ): Promise<User> => {
        const dto: CreateUserDTO = {
            "email": email,
            "phone": phone
        };

        const newUser: User = await UserRepositoryImpl.createUser(dto);

        return newUser;
    }

    /**
     * getUserByIdHandler
     * 
     * This function will handle finding user by its ID. 
     * 
     * @param id 
     */
    public getUserByIdHandler = async (id: number): Promise<User> => {
        const user: User = await UserRepositoryImpl.findUserById(id);

        return user;
    }

}