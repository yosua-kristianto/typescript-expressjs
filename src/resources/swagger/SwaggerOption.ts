import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export default {
  "definition": {
    "info": {
      "title": `${process.env.APP_NAME}`,
      "description": "Just another Swagger UI project",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      },
      "version": "2.0"
    },
    "servers": [`${process.env.SERVER_URI}:${process.env.SERVER_PORT}`],
    "swagger": "2.0",
    "schemes": ["http"],
    "consumes": ["application/json"],
    "produces": ["application/json"]
  },
  "apis": [
    path.resolve('src/main/api/controller/*.ts')
  ],
}