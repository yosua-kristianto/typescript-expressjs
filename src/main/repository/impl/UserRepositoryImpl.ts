import { UserNotFoundException } from '../../common/exception/UserNotFoundException';
import { CreateUserDTO } from '../../model/dto/request/CreateUserDTO';
import User from '../../model/entity/User';
import { UserRepository } from '../UserRepository';

class UserRepositoryImpl implements UserRepository {

  findUserById = async(id: number): Promise<User> =>
    User.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new UserNotFoundException();

      return resultSet;
    });

  getAllUser = async(): Promise<Array<User>> => User.findAll({where: {is_deleted: 0}});

  createUser(request: CreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
    
}

export default new UserRepositoryImpl();