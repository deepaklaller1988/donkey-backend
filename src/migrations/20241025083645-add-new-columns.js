

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('movieprogresses', 'season_id', {
        type: Sequelize.STRING,
      });
    await queryInterface.addColumn('movieprogresses', 'episode_id', {
      type: Sequelize.STRING,
    });
},

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
