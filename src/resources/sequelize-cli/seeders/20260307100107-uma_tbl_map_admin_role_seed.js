'use strict';

// Requires: uma_tbl_admin_users, uma_tbl_roles seeds to be run first.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_map_admin_role"
      (
        id,
        admin_id,
        role_id,
        created_at
      )
      VALUES
        (
          'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f01',
          'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b01',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c01',
          NOW()
        ),
        (
          'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f02',
          'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b02',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c02',
          NOW()
        ),
        (
          'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f03',
          'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b03',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c03',
          NOW()
        ),
        (
          'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f04',
          'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b04',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c04',
          NOW()
        ),
        (
          'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f05',
          'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b05',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c05',
          NOW()
        );
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_map_admin_role"
      WHERE id IN (
        'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f01',
        'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f02',
        'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f03',
        'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f04',
        'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380f05'
      );
    `);
  }
};
