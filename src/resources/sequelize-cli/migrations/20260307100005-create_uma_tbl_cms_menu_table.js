module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('uma_tbl_cms_menu', {
      "cms_menu_id": {
        "primaryKey": true,
        "type": Sequelize.DataTypes.UUID,
        "defaultValue": Sequelize.DataTypes.UUIDV4
      },
      "name": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(20)
      },
      "parent_menu_id": {
        "allowNull": true,
        "type": Sequelize.DataTypes.UUID,
        "comment": "Self-referencing FK. Null if this is a root menu."
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
    return queryInterface.dropTable('uma_tbl_cms_menu');
  }
};
