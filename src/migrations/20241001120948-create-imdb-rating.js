'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('imdb_ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      media_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      media_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imdb_rating: {
        type: Sequelize.DOUBLE
      },
      cached_date: {
        type: Sequelize.DATE
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
    await queryInterface.dropTable('imdb_ratings');
  }
};