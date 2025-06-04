require('dotenv').config()

module.exports = {
  "main": {
    "username": process.env.DB_MAIN_USERNAME,
    "password": process.env.DB_MAIN_PASSWORD,
    "database": process.env.DB_MAIN_DATABASE,
    "host": process.env.DB_MAIN_HOSTNAME,
    "port": process.env.DB_MAIN_PORT,
    "dialect": process.env.DB_MAIN_CONNECTION
  },
}