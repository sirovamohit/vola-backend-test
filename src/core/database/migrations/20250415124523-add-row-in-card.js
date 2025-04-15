'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cards', [{
      id: 'ee3c24b5-89fc-44ef-b512-1c20ff3659b0',
      balance: 10000,
      currency: 'USD',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cards', [{
      id: 'ee3c24b5-89fc-44ef-b512-1c20ff3659b0'
    }], {});
  }
};

