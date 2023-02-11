/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-08 14:58:53
 * @LastEditTime: 2022-11-08 15:27:41
 * @LastEditors: lmfang
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable('CardAttachment', {
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
            boardListCardId: {
                // 字段类型：数字
                type: Sequelize.INTEGER,
                // 设置关联外键
                references: {
                    model: 'BoardListCard',
                    key: 'id'
                },
                // 不允许 null 值
                allowNull: false
            },
            attachmentId: {
                // 字段类型：数字
                type: Sequelize.INTEGER,
                // 设置关联外键
                references: {
                    model: 'Attachment',
                    key: 'id'
                },
                // 不允许 null 值
                allowNull: false
            },
            isCover: {
                type: Sequelize.BOOLEAN,
                defaultValue: 0
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
        // 删除 Attachment  表
        return queryInterface.dropTable('CardAttachment');
    }
};