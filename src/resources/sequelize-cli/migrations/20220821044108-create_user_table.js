'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      "id": {
        "primaryKey": true,
        "autoIncrement": true,
        "type": Sequelize.DataTypes.BIGINT
      },
      "email": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(255)
      },
      "phone": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(20)
      },
      "password": {
        "allowNull": false,
        "type": Sequelize.DataTypes.TEXT,
        "comment": "Always encrypt this."
      },
      "created_at": {
        "allowNull": false,
        "type": 'TIMESTAMP',
        "defaultValue": Sequelize.fn('NOW')
      },
      "updated_at": {
        "allowNull": true,
        "type": 'TIMESTAMP'
      },
      "deleted_at": {
        "allowNull": true,
        "type": 'TIMESTAMP'
      },
      "is_deleted": {
        "allowNull": false,
        "type": Sequelize.DataTypes.SMALLINT,
        "defaultValue": 0
      }
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
