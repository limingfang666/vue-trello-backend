'use strict';

/** @type {import('sequelize-cli').Migration} */
const crypto = require('crypto');
module.exports = {
    async up(queryInterface, Sequelize) {
        let md5 = crypto.createHash('md5');
        let password = md5.update('123456').digest('hex');
        let date = new Date();

        return queryInterface.bulkInsert('User', ['zMouse', 'mt', 'leo', 'reci'].map((name, index) => {
            return {
                id: index + 1,
                name,
                password,
                createdAt: date,
                updatedAt: date
            }
        }));
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('User', null, {});
    }
};