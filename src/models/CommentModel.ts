/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-09 11:19:20
 * @LastEditTime: 2022-11-09 17:51:47
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, ForeignKey, AutoIncrement, Column, AllowNull, Unique,
    CreatedAt, UpdatedAt, BelongsTo
} from 'sequelize-typescript'
import { UserModel } from './UserModel'
import { BoardListCardModel } from './BoardListCardModel'
// 卡片和附件、评论的关系是一对多，一张卡片可以有多个附件，可以有多条评论

@Table({ tableName: 'Comment' })
export class CommentModel extends Model<CommentModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    userId: number;

    @ForeignKey(() => BoardListCardModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    boardListCardId: number;

    @Column({
        type: DataType.STRING(2000),
        defaultValue: ''
    })
    content: string;

    // user和评论是一对多的关系，一个用户可以有多条评论，一条评论只属于一个用户
    @BelongsTo(() => UserModel)
    user: UserModel;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}