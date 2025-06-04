'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('customer', {
      "id": {
        "primaryKey": true,
        "autoIncrement": true,
        "type": Sequelize.DataTypes.BIGINT
      },
      "first_name": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(40)
      },
      "last_name": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(40)
      },
      "city": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(40),
        "comment": "City."
      },
      "country": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(40),
        "comment": "Country."
      },
      "phone": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(20),
        "comment": "The phone"
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
