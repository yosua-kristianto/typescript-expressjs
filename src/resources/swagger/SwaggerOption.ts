import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

export default {
  "info": {
    "title": `${process.env.APP_NAME}`,
    "description": "Just another Swagger UI project"
  },
  "servers": [`${process.env.SERVER_URI}:${process.env.SERVER_PORT}`],
  "apis": [
    path.resolve('src/main/api/controller/*.ts')
  ]
}