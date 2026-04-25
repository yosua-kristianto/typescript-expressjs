'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      INSERT INTO "uma_tbl_mobile_users"
      (
        user_id,
        email,
        name,
        status,
        created_at
      )
      VALUES
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'budi.santoso@gmail.com',    'Budi Santoso',    1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'siti.rahayu@gmail.com',     'Siti Rahayu',     1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'ahmad.fauzi@gmail.com',     'Ahmad Fauzi',     1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14', 'dewi.lestari@gmail.com',    'Dewi Lestari',    1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15', 'rizky.pratama@gmail.com',   'Rizky Pratama',   1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16', 'nurul.hidayah@gmail.com',   'Nurul Hidayah',   1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17', 'eko.prasetyo@gmail.com',    'Eko Prasetyo',    0, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18', 'fitri.handayani@gmail.com', 'Fitri Handayani', 1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19', 'hendra.wijaya@gmail.com',   'Hendra Wijaya',   1, NOW()),
        ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a', 'maya.sari@gmail.com',       'Maya Sari',       0, NOW());
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DELETE FROM "uma_tbl_mobile_users"
      WHERE user_id IN (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a19',
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a1a'
      );
    `);
  }
};
