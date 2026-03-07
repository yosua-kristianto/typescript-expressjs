'use strict';
// All passwords are hashed value of "Password@123"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_admin_users"
      (
        admin_id,
        email,
        password,
        status,
        created_at
      )
      VALUES
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b01', 'superadmin@uma.id',        '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b02', 'admin.ops@uma.id',         '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b03', 'admin.finance@uma.id',     '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b04', 'admin.marketing@uma.id',   '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b05', 'admin.support@uma.id',     '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b06', 'admin.content@uma.id',     '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b07', 'admin.logistics@uma.id',   '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b08', 'admin.warehouse@uma.id',   '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 0, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b09', 'admin.reporting@uma.id',   '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 1, NOW()),
        ('b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b0a', 'admin.compliance@uma.id',  '$2a$12$OsWGGE.UL.BtUtD4JN0V9OI5LNJEZaLIw2MapeM233X9qeGWJ.RiS', 0, NOW());
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_admin_users"
      WHERE admin_id IN (
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b01',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b02',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b03',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b04',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b05',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b06',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b07',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b08',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b09',
        'b1ffcd00-9c0b-4ef8-bb6d-6bb9bd380b0a'
      );
    `);
  }
};
