import Knex from "knex";
import config from './Config';
import { Log } from './Logging';
import path from 'path';
import {Sequelize} from "sequelize-typescript";
import {Dialect} from "sequelize";

const NAMESPACE: string = "DATABASE";

interface DatabaseConnectionSetup {
    "database": string,
    "username": string,
    "password": string,
    "host": string,
    "dialect": Dialect,
    "port": number
}

export class DatabaseDriver {

    // You can always specify new ORM driver in here
    private availableDriver: Array<string> = ['sequelize', 'knex'];

    // Selected connection setup
    private configuration: DatabaseConnectionSetup;
    private readonly selectedDriver: string;

    public constructor(driver: string, setup: DatabaseConnectionSetup) {
        if(this.availableDriver.indexOf(driver) == -1){
            throw new Error(`Database with selected driver ${driver}) is not found!`);
        }

        this.selectedDriver = driver;
        this.configuration = setup;
    }

    public authenticate(): any {
        let connection: any = null;

        switch(this.selectedDriver){
            case "sequelize":
                let sequelize: Sequelize = new Sequelize(
                        this.configuration.database,
                        this.configuration.username,
                        this.configuration.password,
                        {
                            "host"        : this.configuration.host,
                            "dialect"     : this.configuration.dialect,
                            "port"        : this.configuration.port,
                            // "logging"     : (... msg) => console.log(msg),
                            // "logging"     : false
                            "models"      : [path.join(__dirname, "../model/entity")]
                        }
                );

                sequelize
                    .authenticate()
                    .then(async () => {
                        Log.d(NAMESPACE, `Connection to ${this.configuration.database} has been established.`);
                    })
                    .catch(error => {
                        Log.e(NAMESPACE, `Connection to ${this.configuration.database} cannot be established: ${error}`);
                    });

                connection = sequelize;
                break;

            case "knex":
                connection = Knex({
                    "client": this.configuration.dialect.toString(),
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

                connection().on( 'query', function( queryData: string ) {
                    console.log( "Executed query: " + queryData );
                });

                Log.d(NAMESPACE, `Connection to ${this.configuration.database} has been established.`);

                break;
        }

        return connection;
    }
}

export const Database = (connection: string = "main"): any => {
    type DatabaseConnectionObject = keyof typeof config.database;
    const selection = connection as DatabaseConnectionObject;
    return new DatabaseDriver(
            config.database[selection].orm_driver as string,
            {
                "database": config.database[selection].database as string,
                "username": config.database[selection].username as string,
                "password": config.database[selection].password as string,
                "host": config.database[selection].uri as string,
                "port": config.database[selection].port as number,
                "dialect": config.database[selection].dialect as Dialect
            }
    ).authenticate();
}

