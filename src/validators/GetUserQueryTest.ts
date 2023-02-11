/*
 * @Description:
 * @Author: lmfang
 * @Date: 2022-10-10 10:28:42
 * @LastEditTime: 2022-11-04 17:02:44
 * @LastEditors: lmfang
 */
import { IsNumberString, IsNotEmpty, isNotEmpty, MinLength } from 'class-validator'

export class GetUserQuery {

    @IsNotEmpty({ message: 'page值不能为空' })
    // 版本问题：0.13.0版本IsNumberString后面不能自定义message内容，^0.12.0-rc.0版本可以
    @IsNumberString()
    page: number;

    @IsNotEmpty({ message: 'name不能为空' })
    @MinLength(2, { message: 'name长度不能小于2个字符' })
    name: string;

    @IsNotEmpty({ message: 'name不能为空' })
    password: string;
}

export class TestPostUserBody {

    @IsNotEmpty({ message: 'name不能为空' })
    @MinLength(2, { message: 'name长度不能小于2个字符' })
    name: string;

    @IsNotEmpty({ message: 'password不能为空' })
    password: string;

    @IsNotEmpty({ message: 'createAt不能为空' })
    createAt: string;
}
