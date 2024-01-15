"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "John Doe1",
          username: "123",
          password: "fake1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "John Doe2",
          username: "234",
          password: "fake2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "John Doe3",
          username: "345",
          password: "fake3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
