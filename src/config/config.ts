import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT || 57898;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
const APP_NAME = process.env.APP_NAME || 'DJIM Paspor Online API';

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  app: APP_NAME
}

export default {
  server: SERVER
};