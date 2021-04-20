import { Sequelize } from 'sequelize-typescript';
import config from './config';
import { Log } from './logging';

const NAMESPACE: string = "DATABASE"

/**
 * Authenticate the database.
 */
const mainConnection = (): Sequelize => {
  let sequalize: Sequelize = new Sequelize(
    config.database.main.database,
    config.database.main.username,
    config.database.main.password,
    {
      host        : config.database.main.uri,
      dialect     : config.database.main.dialect,
      logging     : (... msg) => console.log(msg),
      models      : [__dirname + "/model/entity"]
    }
  );

  sequalize
    .authenticate()
    .then(() => {
      Log.d(NAMESPACE, `Connection to ${config.database.main.database} has been established.`);
    })
    .catch(error => {
      Log.e(NAMESPACE, `Connection to ${config.database.main.database} cannot be established: ${error}`);
    });

  return sequalize;
}

export default mainConnection();

