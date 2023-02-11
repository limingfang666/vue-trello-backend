/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-09 11:07:56
 * @LastEditTime: 2022-11-09 16:56:47
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, ForeignKey, AutoIncrement, Column, AllowNull, Unique, Default,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript'
import { UserModel } from './UserModel'


@Table({ tableName: 'Attachment' })
export class AttachmentModel extends Model<AttachmentModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    userId: number;

    @Default('')
    @Column({
        type: DataType.STRING(255)
    })
    originName: string;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(255)
    })
    name: string;

    @AllowNull(false)
    @Column({
        type: DataType.STRING(50)
    })
    type: string;

    @Default(0)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    size: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}