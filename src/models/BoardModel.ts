/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-08 17:27:23
 * @LastEditTime: 2022-11-09 16:56:30
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, ForeignKey, AutoIncrement, Column, AllowNull, Unique,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript'
import { UserModel } from './UserModel'


@Table({ tableName: 'Board' })
export class BoardModel extends Model<BoardModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    userId: number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(255)
    })
    name: string;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}