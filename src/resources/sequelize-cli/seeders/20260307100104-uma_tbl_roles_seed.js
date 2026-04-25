'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_roles"
      (
        role_id,
        name,
        created_at
      )
      VALUES
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c01', 'Super Admin',   NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c02', 'Admin Ops',     NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c03', 'Admin Finance', NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c04', 'Admin Mktg',    NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c05', 'Admin Support', NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c06', 'Admin Content', NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c07', 'Admin Logistic', NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c08', 'Admin Warehous', NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c09', 'Admin Report',  NOW()),
        ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c0a', 'Viewer',        NOW());
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_roles"
      WHERE role_id IN (
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c01',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c02',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c03',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c04',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c05',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c06',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c07',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c08',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c09',
        'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380c0a'
      );
    `);
  }
};
