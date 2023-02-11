/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-09 10:57:50
 * @LastEditTime: 2022-11-09 16:56:37
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, ForeignKey, AutoIncrement, Column, AllowNull, Unique,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript'
import { UserModel } from './UserModel'
import { BoardModel } from './BoardModel'


@Table({ tableName: 'BoardList' })
export class BoardListModel extends Model<BoardListModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    userId: number;

    @ForeignKey(() => BoardModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    boardId: number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(255)
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.FLOAT
    })
    order: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}