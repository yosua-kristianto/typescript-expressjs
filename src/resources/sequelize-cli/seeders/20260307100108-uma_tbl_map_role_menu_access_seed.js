'use strict';

// Requires: uma_tbl_roles, uma_tbl_cms_menu seeds to be run first.
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_map_role_menu_access"
      (
        role_access_id,
        role_id,
        cms_menu_id,
        name,
        created_at
      )
      VALUES
        (
          'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c01',
          'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d01',
          'Full Access',
          NOW()
        ),
        (
          'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c02',
          'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d06',
          'Ops Users',
          NOW()
        ),
        (
          'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c03',
          'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d08',
          'Finance View',
          NOW()
        ),
        (
          'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c09',
          'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d09',
          'Report View',
          NOW()
        ),
        (
          'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a05',
          'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c0a',
          'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d01',
          'View Only',
          NOW()
        );
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_map_role_menu_access"
      WHERE role_access_id IN (
        'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a01',
        'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a02',
        'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a03',
        'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a04',
        'a6eebc99-9c0b-4ef8-bb6d-6bb9bd380a05'
      );
    `);
  }
};
