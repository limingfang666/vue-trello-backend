'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        let date = new Date();

        return queryInterface.bulkInsert('Board', ['board1', 'board2', 'board3', 'board4'].map((name, index) => {
            return {
                id: index + 1,
                userId: 5,
                name,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Board', null, {});
    }
};