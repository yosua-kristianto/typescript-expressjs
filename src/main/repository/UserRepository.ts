import {UserNotFoundException} from '../common/exception/UserNotFoundException';
import {CreateUserDTO} from '../api/user/request/CreateUserDTO';
import MobileUser from '../model/entity/MobileUser';
import {IUserRepository} from './IUserRepository';

class UserRepository implements IUserRepository {

  findUserById = async(id: number): Promise<MobileUser> =>
    MobileUser.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new UserNotFoundException();

      return resultSet;
    });

  getAllUser = async(): Promise<Array<MobileUser>> => MobileUser.findAll({where: {is_deleted: 0}});

  createUser = async (request: CreateUserDTO): Promise<MobileUser> =>
    MobileUser.create({
      "email": request.email,
      "phone": request.phone,
      "password": "default",
      "is_deleted": 0
    });
    
}

export default new UserRepository();