import MobileUser from '../model/entity/MobileUser';
import {IUserRepository} from './IUserRepository';

class UserRepository implements IUserRepository {

  findUserById = async(id: number): Promise<MobileUser> =>
    MobileUser.findOne({
      where: {
        deleted_at: null,
        id: id
      }
    }).then(resultSet => {
      if(resultSet === null) throw new Error("User not found");

      return resultSet;
    });

  getAllUser = async(): Promise<Array<MobileUser>> => MobileUser.findAll({where: {deleted_at: null}});
    
}

export default new UserRepository();