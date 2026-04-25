'use strict';

// Rows 01–05 are root menus (parent_menu_id = NULL).
// Rows 06–10 are child menus that reference the root menus above.

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_cms_menu"
      (
        cms_menu_id,
        name,
        parent_menu_id,
        created_at
      )
      VALUES
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d01', 'Dashboard',    NULL,                                        NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d02', 'User Mgmt',    NULL,                                        NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d03', 'Finance',      NULL,                                        NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d04', 'Reports',      NULL,                                        NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d05', 'Settings',     NULL,                                        NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d06', 'Mobile Users', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d02',     NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d07', 'Admin Users',  'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d02',     NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d08', 'Invoices',     'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d03',     NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d09', 'Daily Report', 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d04',     NOW()),
        ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380d0a', 'Role Access',  'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d05',     NOW());
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_cms_menu"
      WHERE cms_menu_id IN (
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d01',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d02',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d03',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d04',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d05',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d06',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d07',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d08',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d09',
        'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380d0a'
      );
    `);
  }
};
