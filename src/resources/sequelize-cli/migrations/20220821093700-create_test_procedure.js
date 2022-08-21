'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    CREATE PROCEDURE GetExample()
    BEGIN
      SELECT 1;
    END;
    `)
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('DROP PROCEDURE GetExample;')
  }
};
