'use strict';

// Requires: uma_tbl_mobile_users, uma_tbl_lov_device_type seeds to be run first.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_user_devices"
      (
        device_id,
        user_id,
        last_login,
        device_type_id,
        created_at
      )
      VALUES
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e01', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', NOW(), 'ANDROID',        NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e02', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', NOW(), 'IOS',            NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e03', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', NOW(), 'ANDROID',        NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e04', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', NOW(), 'IOS',            NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e05', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', NOW(), 'TABLET_ANDROID', NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e06', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', NOW(), 'TABLET_IOS',     NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e07', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', NULL,  'DEBUG',          NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e08', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', NOW(), 'ANDROID',        NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e09', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', NOW(), 'IOS',            NOW()),
        ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e0a', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a', NULL,  'DEBUG',          NOW());
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_user_devices"
      WHERE device_id IN (
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e01',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e02',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e03',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e04',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e05',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e06',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e07',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e08',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e09',
        'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380e0a'
      );
    `);
  }
};
