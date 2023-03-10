'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('BoardList', ['任务1', '任务2', '任务3', '任务4'].map((name, index) => {
            return {
                id: index + 1,
                userId: 5,
                boardListId: 1,
                name,
                order: 20355 * index,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('BoardList', null, {});
    }
};