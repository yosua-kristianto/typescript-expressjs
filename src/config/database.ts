import { Sequelize } from 'sequelize-typescript';
import config from './config';
import { Log } from './logging';
import path from 'path';

const NAMESPACE: string = "DATABASE"

/**
 * Authenticate the database.
 */
const mainConnection = (): Sequelize => {
  let sequelize: Sequelize = new Sequelize(
    config.database.main.database,
    config.database.main.username,
    config.database.main.password,
    {
      host        : config.database.main.uri,
      dialect     : config.database.main.dialect,
      logging     : (... msg) => console.log(msg),
      models      : [path.join(__dirname, "../model/entity")]
    }
  );

  sequelize
    .authenticate()
    .then(async () => {
      Log.d(NAMESPACE, `Connection to ${config.database.main.database} has been established.`);

      try{
        await sequelize.sync({
          force: true
        });
      }catch(error){
        Log.e(NAMESPACE, error.message);
      }
    })
    .catch(error => {
      Log.e(NAMESPACE, `Connection to ${config.database.main.database} cannot be established: ${error}`);
    });

  return sequelize;
}

export default mainConnection();

