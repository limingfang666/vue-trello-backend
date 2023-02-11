/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-09 11:12:57
 * @LastEditTime: 2022-11-09 16:55:25
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, ForeignKey, AutoIncrement, Column, AllowNull, Default,
    CreatedAt, UpdatedAt, BelongsTo
} from 'sequelize-typescript'
import { UserModel } from './UserModel'
import { BoardListCardModel } from './BoardListCardModel'
import { AttachmentModel } from './AttachmentModel'


@Table({ tableName: 'CardAttachment' })
export class CardAttachmentModel extends Model<CardAttachmentModel> {

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

    @ForeignKey(() => AttachmentModel)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    attachmentId: number;


    @Default(0)
    @Column({
        type: DataType.INTEGER.UNSIGNED
    })
    isCover: number;

    // 附件和附件关联表，一对多关系，一条附件有多个附件详细信息（一个附件属于多张不同的卡片）
    @BelongsTo(() => AttachmentModel)
    attachment: AttachmentModel;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}