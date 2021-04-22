import { CreateUserDTO } from '../../model/dto/request/create-user-dto';
import User from '../../model/entity/user';
import { UserRepository } from '../user-repository';

class UserRepositoryImpl implements UserRepository {

  async findUserById(id: number): Promise<User | null> {

    const execution = User.findOne({
      where: {
        is_deleted: 0,
        id: id
      }
    }).then(resultSet => {
      return resultSet;
    });

    return await execution;
  }

  async getAllUser(): Promise<User[]> {

    const execution: Array<User> = await User.findAll({
      where: {
        is_deleted: 0
      },
    }).then(resultSet => {
      return resultSet;
    });

    return execution;
  }

  createUser(request: CreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
    
  }
    
}

export default new UserRepositoryImpl();