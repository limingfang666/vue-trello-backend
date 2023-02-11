/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-09 11:02:30
 * @LastEditTime: 2022-11-09 17:46:00
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, ForeignKey, AutoIncrement, Column, AllowNull, Unique, Default, CreatedAt, UpdatedAt,
    HasMany
} from 'sequelize-typescript'
import { UserModel } from './UserModel'
import { BoardListModel } from './BoardListModel'
// 卡片和附件、评论的关系是一对多，一张卡片可以有多个附件，可以有多条评论，但是一个附件信息只属于一张卡片，一条评论信息只属于一张卡片
import { CardAttachmentModel } from './CardAttachmentModel'
import { CommentModel } from './CommentModel'


@Table({ tableName: 'BoardListCard' })
export class BoardListCardModel extends Model<BoardListCardModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    userId: number;

    @ForeignKey(() => BoardListModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    boardListId: number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(255)
    })
    name: string;

    @Default('')
    @Column({
        type: DataType.STRING(2000)
    })
    description: string;

    @Column({
        type: DataType.FLOAT,
        defaultValue: 0
    })
    order: number;

    // 模型中定义卡片和附件及评论的关系
    @HasMany(() => CardAttachmentModel)
    attachments: CardAttachmentModel[];

    @HasMany(() => CommentModel)
    comments: CommentModel[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}