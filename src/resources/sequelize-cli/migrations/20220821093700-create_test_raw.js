'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    SELECT 1;
    `)
  },

  async down (queryInterface, Sequelize) {
  }
};
