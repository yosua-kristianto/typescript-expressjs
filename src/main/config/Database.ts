import { Sequelize } from 'sequelize-typescript';
import config from './Config';
import { Log } from './Logging';
import path from 'path';

const NAMESPACE: string = "DATABASE";

/**
 * Authenticate the database.
 */
const mainConnection = (): Sequelize => {
  let sequelize: Sequelize = new Sequelize(
    config.database.main.database,
    config.database.main.username,
    config.database.main.password,
    {
      "host"        : config.database.main.uri,
      "dialect"     : config.database.main.dialect,
      "port"        : config.database.main.port,
      // "logging"     : (... msg) => console.log(msg),
      // "logging"     : false
      "models"      : [path.join(__dirname, "../model/entity")]
    }
  );

  sequelize
    .authenticate()
    .then(async () => {
      Log.d(NAMESPACE, `Connection to ${config.database.main.database} has been established.`);

      try{
        await sequelize.sync({
          /**
           If you uncomment this, you want to comment the alter option.
           With this option uncommented, the database table instance
           will be created by force (By Dropping, and then re create the table)

          force: true,
          
          */
          
          "alter": {
            drop: false
          }
        });
      }catch(error: any){
        Log.e(NAMESPACE, error.message);
      }
    })
    .catch(error => {
      Log.e(NAMESPACE, `Connection to ${config.database.main.database} cannot be established: ${error}`);
    });

  return sequelize;
}

export default mainConnection();

