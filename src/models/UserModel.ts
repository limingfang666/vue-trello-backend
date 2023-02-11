/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-08 17:13:10
 * @LastEditTime: 2022-11-08 17:26:35
 * @LastEditors: lmfang
 */

import {
    Model, Table, DataType, PrimaryKey, AutoIncrement, Column, AllowNull, Unique,
    CreatedAt, UpdatedAt
} from 'sequelize-typescript'
import crypto from 'crypto'

@Table({ tableName: 'User' })
export class UserModel extends Model<UserModel> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @AllowNull(false)
    @Unique
    @Column({
        type: DataType.STRING(50)
    })
    name: string;

    @Column({
        type: DataType.STRING(32)
    })
    set password(val: string) {
        // 使用set/get寄存器对存取数据进行统一处理
        let md5 = crypto.createHash('md5');
        let newPassword = md5.update(`${val}`).digest('hex');
        this.setDataValue('password', newPassword);
    };

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}