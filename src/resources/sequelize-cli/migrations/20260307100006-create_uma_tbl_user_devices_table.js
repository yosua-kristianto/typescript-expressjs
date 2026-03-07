module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('uma_tbl_user_devices', {
      "device_id": {
        "primaryKey": true,
        "type": Sequelize.DataTypes.UUID,
        "defaultValue": Sequelize.DataTypes.UUIDV4
      },
      "user_id": {
        "allowNull": false,
        "type": Sequelize.DataTypes.UUID,
        "references": {
          "model": "uma_tbl_mobile_users",
          "key": "user_id"
        },
        "onUpdate": "CASCADE",
        "onDelete": "RESTRICT"
      },
      "last_login": {
        "allowNull": true,
        "type": 'TIMESTAMP'
      },
      "device_type_id": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(20),
        "references": {
          "model": "uma_tbl_lov_device_type",
          "key": "device_type_id"
        },
        "onUpdate": "CASCADE",
        "onDelete": "RESTRICT"
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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('uma_tbl_user_devices');
  }
};
