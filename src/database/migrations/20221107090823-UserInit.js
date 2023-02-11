/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-07 17:08:23
 * @LastEditTime: 2022-11-07 17:09:21
 * @LastEditors: lmfang
 */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    // up(): 执行迁移命令（`db:migrate`）的时候调用
    async up(queryInterface, Sequelize) {
        /*
				up 需要返回一个 Promise
				queryInterface.createTable 方法用于创建表
						- 第一个参数是要创建的表的名称
						- 第二个参数是一个对象，用来描述表中包含的字段信息
						- queryInterface.createTable 返回一个 Promise
		*/
        return queryInterface.createTable('User', {
            id: {
                // 字段类型：数字
                type: Sequelize.INTEGER,
                // 设置为主键
                primaryKey: true,
                // 自动增长
                autoIncrement: true
            },
            name: {
                // 字符串类型（50长度）
                type: Sequelize.STRING(50),
                // 值唯一
                unique: true,
                // 不允许 null 值
                allowNull: false
            },
            password: {
                // 字符串类型（32长度）
                type: Sequelize.STRING(32),
                // 不允许 null 值
                allowNull: false
            },
            createdAt: {
                // 日期类型
                type: Sequelize.DATE,
                // 不允许 null 值
                allowNull: false
            }
        });
    },

    // down：执行撤销/回滚命令（`db:migrate:undo`）的时候调用
    async down(queryInterface, Sequelize) {
        // 删除 user 表
        return queryInterface.dropTable('User');
    }
};