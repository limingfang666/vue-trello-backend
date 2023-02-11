/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-08 14:57:47
 * @LastEditTime: 2022-11-08 15:17:39
 * @LastEditors: lmfang
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('BoardListCard', {
            id: {
                // 字段类型：数字
                type: Sequelize.INTEGER,
                // 设置为主键
                primaryKey: true,
                // 自动增长
                autoIncrement: true
            },
            userId: {
                // 字段类型：数字
                type: Sequelize.INTEGER,
                // 设置关联外键
                references: {
                    model: 'User',
                    key: 'id'
                },
                // 不允许 null 值
                allowNull: false
            },
            boardListId: {
                // 字段类型：数字
                type: Sequelize.INTEGER,
                // 设置关联外键
                references: {
                    model: 'BoardList',
                    key: 'id'
                },
                // 不允许 null 值
                allowNull: false
            },
            name: {
                // 字符串类型（255长度）
                type: Sequelize.STRING(255),
                // 值唯一
                unique: true,
                // 不允许 null 值
                allowNull: false
            },
            description: {
                // 字符串类型（2000长度）
                type: Sequelize.STRING(2000),
                defaultValue: ''
            },
            order: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            createdAt: {
                // 日期类型
                type: Sequelize.DATE,
                // 不允许 null 值
                allowNull: false
            },
            updatedAt: {
                // 日期类型
                type: Sequelize.DATE,
                // 不允许 null 值
                allowNull: false
            }
        });
    },

    async down(queryInterface, Sequelize) {
        // 删除 BoardListCard 表
        return queryInterface.dropTable('BoardListCard');
    }
};