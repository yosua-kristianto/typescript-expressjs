import {DatabaseSlave} from "./DatabaseSlave";
import config from "./Config";

/**
 * DB
 *
 * This facade class contains Database Connection Management.
 * This class help you switch remote connection when you use multiple database connections.
 */
export class DB {

  private static _instance: DB | null = null;
  private databaseConnectionSelector = {};
  private availableConnectionLabel: Array<string> = [];


  /**
   * Read how many database configurations has been loaded within
   * config.database
   *
   * After that, save the pool into array to be later saved in the databaseConnectionSelector
   * as singleton object.
   */
  private constructor() {
    for(const e in config.database){

      try{
        type DatabaseConnectionSelectorKey = keyof typeof this.databaseConnectionSelector;
        const objectKey = e as DatabaseConnectionSelectorKey;

        this.availableConnectionLabel.push(e);

        // @ts-ignore
        this.databaseConnectionSelector[objectKey] = DatabaseSlave(e);
      }catch(error){
        // In some occasion, user want to prepare multiple database connections
        // End up, the second even the third one will never be used.
        // To prevent error from the database connection, I use try-catch to skip the
        // connection selection on enable false. Check out config.database
      }

    }
  }

  /**
   * connection
   * @static
   *
   * This function contains connection remote selection to
   * other registered
   * @param connection
   */
  public static connection = (connection: string = 'main'): any => {
    console.log("Attempt to change remote to " + connection);
    return this.getInstance().getConnection(connection);
  }

  /**
   * getConnection
   *
   * This function is used to access the private attribute.
   *
   * @param connection
   */
  private getConnection = (connection: string = 'main'): any => {
    if(!this.availableConnectionLabel.includes(connection)){
      throw new Error(`Connection with label of ${connection} is not set! Please consider to check Config.ts within database configuration`);
    }

    type DatabaseConnectionSelectorKey = keyof typeof this.databaseConnectionSelector;
    const objectKey = connection as DatabaseConnectionSelectorKey;

    const selectedConnection = this.databaseConnectionSelector[objectKey];
    return selectedConnection;
  }

  /**
   * getInstance
   * @static
   *
   * Singleton get instance.
   */
  private static getInstance(): DB {
    if(this._instance == null){
      this._instance = new DB();
    }

    return this._instance;
  }

}

export default DB.connection();