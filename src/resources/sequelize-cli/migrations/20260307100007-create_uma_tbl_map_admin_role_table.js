module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('uma_tbl_map_admin_role', {
      "id": {
        "primaryKey": true,
        "type": Sequelize.DataTypes.UUID,
        "defaultValue": Sequelize.DataTypes.UUIDV4
      },
      "admin_id": {
        "allowNull": false,
        "type": Sequelize.DataTypes.UUID,
        "references": {
          "model": "uma_tbl_admin_users",
          "key": "admin_id"
        },
        "onUpdate": "CASCADE",
        "onDelete": "RESTRICT"
      },
      "role_id": {
        "allowNull": false,
        "type": Sequelize.DataTypes.UUID,
        "references": {
          "model": "uma_tbl_roles",
          "key": "role_id"
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
    return queryInterface.dropTable('uma_tbl_map_admin_role');
  }
};
