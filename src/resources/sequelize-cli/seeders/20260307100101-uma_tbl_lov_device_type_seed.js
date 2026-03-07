'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_lov_device_type"
      (
        device_type_id,
        created_at
      )
      VALUES
        ('IOS',            NOW()),
        ('ANDROID',        NOW()),
        ('DEBUG',          NOW()),
        ('WEB',            NOW()),
        ('TABLET_IOS',     NOW()),
        ('TABLET_ANDROID', NOW()),
        ('SMARTWATCH',     NOW()),
        ('SMART_TV',       NOW()),
        ('DESKTOP',        NOW()),
        ('UNKNOWN',        NOW());
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_lov_device_type"
      WHERE device_type_id IN (
        'IOS', 'ANDROID', 'DEBUG', 'WEB', 'TABLET_IOS',
        'TABLET_ANDROID', 'SMARTWATCH', 'SMART_TV', 'DESKTOP', 'UNKNOWN'
      );
    `);
  }
};
