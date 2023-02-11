/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-07 17:28:26
 * @LastEditTime: 2022-11-07 17:29:04
 * @LastEditors: lmfang
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // 给 User 表添加列（字段）：updateAt
        return queryInterface.addColumn('User', 'updatedAt', {
            type: Sequelize.DATE,
            allowNull: false
        })
    },

    async down(queryInterface, Sequelize) {
        // 删除 user 表的 updatedAt 列（字段）
        return queryInterface.removeColumn('User', 'updatedAt');
    }
};