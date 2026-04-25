module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('uma_tbl_map_role_menu_access', {
      "role_access_id": {
        "primaryKey": true,
        "type": Sequelize.DataTypes.UUID,
        "defaultValue": Sequelize.DataTypes.UUIDV4
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
      "cms_menu_id": {
        "allowNull": false,
        "type": Sequelize.DataTypes.UUID,
        "references": {
          "model": "uma_tbl_cms_menu",
          "key": "cms_menu_id"
        },
        "onUpdate": "CASCADE",
        "onDelete": "RESTRICT"
      },
      "name": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(20)
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
    return queryInterface.dropTable('uma_tbl_map_role_menu_access');
  }
};
