import {UserNotFoundException} from '@common/exception/UserNotFoundException';
import {CreateUserDTO} from '@api/user/request/CreateUserDTO';
import MobileUser from '@model/entity/MobileUser';
import {IUserRepository} from '@repository/IUserRepository';

class UserRepository implements IUserRepository {

  findUserById = async(id: number): Promise<MobileUser> =>
    MobileUser.findOne({
      where: {
        deleted_at: null,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new UserNotFoundException();

      return resultSet;
    });

  getAllUser = async(): Promise<Array<MobileUser>> => MobileUser.findAll({where: {deleted_at: null}});

  createUser = async (request: CreateUserDTO): Promise<MobileUser> =>
    MobileUser.create({
      "email": request.email,
      "phone": request.phone,
      "password": "default",
      "is_deleted": 0
    });
    
}

export default new UserRepository();