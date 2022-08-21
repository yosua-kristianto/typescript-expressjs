'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('user',
      {
        "id": {
          "primaryKey": true,
          "autoIncrement": true,
          "type": Sequelize.DataTypes.INTEGER
        },
        "email": {
          "allowNull": false,
          "field": "email",
          "type": Sequelize.DataTypes.STRING(255)
        },
        "phone": {
          "allowNull": false,
          "field": "phone",
          "type": Sequelize.DataTypes.STRING(20)
        },
        "password": {
          "allowNull": true,
          "field": "password",
          "comment": "Make sure this is encrypted!!!",
          "type": Sequelize.DataTypes.TEXT
        },
        "is_deleted": {
          "allowNull": false,
          "field": "is_deleted",
          "comment": "0: Not Deleted | 1: Deleted",
          "type": Sequelize.DataTypes.BOOLEAN,
          "default": 0
        }
      }
    );
  },


  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('user');
  }
};
