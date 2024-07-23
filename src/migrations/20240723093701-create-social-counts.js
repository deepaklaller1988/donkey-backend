'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SocialCounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      facebook_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      twitter_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,

      },
      messager_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,

      },
      reddit_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,

      },
      whatsapp_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,

      },
      telegram_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SocialCounts');
  }
};