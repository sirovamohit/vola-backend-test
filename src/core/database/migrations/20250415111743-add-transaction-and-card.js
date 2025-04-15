// migrations/xxxx-create-card.js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cards', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      balance: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },
      currency: {
        type: Sequelize.STRING(3),
        allowNull: false,
        defaultValue: 'USD'
      },
      status: {
        type: Sequelize.ENUM('active', 'blocked', 'expired'),
        defaultValue: 'active'
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      cardId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false
      },
      transactionType: {
        type: Sequelize.ENUM('debit', 'credit'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'approved', 'failed', 'refunded'),
        defaultValue: 'pending',
      },
      deletedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });

  },
  async down(queryInterface) {
    await queryInterface.dropTable('transactions');
    await queryInterface.dropTable('cards');
  },
};
