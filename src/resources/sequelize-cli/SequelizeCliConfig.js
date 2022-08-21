require('dotenv').config()

module.exports = {
  "main": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOSTNAME,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_CONNECTION
  },
}