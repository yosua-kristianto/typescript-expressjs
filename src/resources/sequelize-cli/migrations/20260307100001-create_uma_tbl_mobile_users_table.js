module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('uma_tbl_mobile_users', {
      "user_id": {
        "primaryKey": true,
        "type": Sequelize.DataTypes.UUID,
        "defaultValue": Sequelize.DataTypes.UUIDV4
      },
      "email": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(200)
      },
      "name": {
        "allowNull": false,
        "type": Sequelize.DataTypes.STRING(200)
      },
      "status": {
        "allowNull": false,
        "type": Sequelize.DataTypes.SMALLINT,
        "defaultValue": 0
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
    return queryInterface.dropTable('uma_tbl_mobile_users');
  }
};
