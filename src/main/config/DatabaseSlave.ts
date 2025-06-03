import Knex from "knex";
import config from './Config';
import {Log} from './Logging';
import {Sequelize, SequelizeOptions} from "sequelize-typescript";
import {Dialect} from "sequelize";

const NAMESPACE = "DATABASE";

interface DatabaseConnectionSetup {
    "database": string,
    "username": string,
    "password": string,
    "host": string,
    "dialect": Dialect,
    "port": number,
    "path": Array<string>
}

export class DatabaseDriver {

    // You can always specify new ORM driver in here
    private availableDriver: Array<string> = ['sequelize', 'knex'];

    // Selected connection setup
    private configuration: DatabaseConnectionSetup;
    private readonly selectedDriver: string;

    /**
     * driverSynonym
     *
     * This function is in response of the error that caused by knex
     * driver which treat 'mysql' as 'mysql' and not 'mysql2'.
     *
     * The 'mysql' driver simply cannot take data from MySQL 8 for some reason.
     * See the link for more information
     *
     * @link https://github.com/knex/knex/issues/3233#issuecomment-988579036
     *
     * @private
     */
    private driverSynonym(): Dialect | string {
        let synonym: Dialect | string = this.configuration.dialect;

        switch (this.selectedDriver){
            case "knex":
                if(this.configuration.dialect == 'mysql') {
                    synonym = 'mysql2';
                }

                break;

            case "sequelize":
                // if(this.configuration.dialect == 'mssql'){
                //     synonym = 
                // }
            
        }

        return synonym;
    }

    public constructor(driver: string, setup: DatabaseConnectionSetup) {
        if(this.availableDriver.indexOf(driver) == -1){
            throw new Error(`Database with selected driver ${driver}) is not found!`);
        }

        this.selectedDriver = driver;
        this.configuration = setup;
    }

    /**
     * authenticate
     *
     * This function will start the authentication system whatever you choose Sequelize or Knex.
     * Once the return statement being made, the returned value is the database driver settings loaded.
     */
    public authenticate(): any {
        let connection: any = null;

        if(this.selectedDriver == "sequelize"){
            const sequelizeOption: SequelizeOptions = {
                "host"        : this.configuration.host,
                "dialect"     : this.configuration.dialect,
                "port"        : this.configuration.port,
                // "logging"     : (... msg) => console.log(msg),
                "logging"     : false,
                "models"      : this.configuration.path,
                "timezone"    : "Asia/Jakarta",
            };
            
            if(this.configuration.dialect === 'mssql'){
                sequelizeOption.dialectOptions= {
                    "trustServerCertificate": true,
                    "trustedConnection": true,
                    "encrypt": true,
                    "options": {
                        "useUTC": false
                    }
                }
            }else if(this.configuration.dialect === 'postgres'){
                sequelizeOption.dialectOptions= {
                    "trustServerCertificate": true,
                    "trustedConnection": true,
                    "encrypt": true,
                    "useUTC": false
                }
            }

            const sequelize = new Sequelize(
                this.configuration.database,
                this.configuration.username,
                this.configuration.password,
                sequelizeOption
            );

            sequelize
                .authenticate()
                .then(async () => {
                    Log.d(NAMESPACE, `[ORM DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} has been established.`);
                })
                .catch(error => {
                    Log.e(NAMESPACE, `[ORM DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} cannot be establish: ${error}`);
                });

            connection = sequelize;
        }else {
            try{
                connection = Knex({
                    "client": this.driverSynonym(),
                    "connection": {
                        "host": this.configuration.host,
                        "port": this.configuration.port,
                        "user": this.configuration.username,
                        "password": this.configuration.password,
                        "database": this.configuration.database
                    },
                    "pool": {
                        "min": 0,
                        "max": 7
                    }
                });

                Log.d(NAMESPACE, `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} has been established.`);
            }catch(error){
                Log.d(NAMESPACE, `[KNEX DRIVER (${this.selectedDriver})] Connection to ${this.configuration.database} cannot be established: ${error}`);
            }
        }

        return connection;
    }
}

/**
 * DatabaseSlave
 *
 * This function will return Slave that has been loaded with ORM Driver configuration.
 * 1 DatabaseSlave represent one Database Connection.
 *
 * The slave will only make a pool into enabled connection.
 * See config.database
 *
 * @param connection
 * @constructor
 */
export const DatabaseSlave = (connection = "main"): any => {
    type DatabaseConnectionObject = keyof typeof config.database;
    const selection = connection as DatabaseConnectionObject;

    if(!config.database[selection].enable){
        throw new Error(`WARNING: Connection ${connection} is not enabled!`);
    }

    return new DatabaseDriver(
            config.database[selection].orm_driver as string,
            {
                "database": config.database[selection].database as string,
                "username": config.database[selection].username as string,
                "password": config.database[selection].password as string,
                "host": config.database[selection].uri as string,
                "port": config.database[selection].port as number,
                "dialect": config.database[selection].dialect as Dialect,
                "path": config.database[selection].path as Array<string>
            }
    ).authenticate();
}

