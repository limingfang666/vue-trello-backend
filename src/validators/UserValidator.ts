/*
 * @Description: 用户验证前端用户表单数据
 * @Author: lmfang
 * @Date: 2022-11-09 17:09:57
 * @LastEditTime: 2022-12-02 10:39:19
 * @LastEditors: lmfang
 */

import { IsNotEmpty, Length, ValidateIf } from 'class-validator'
import { IsSameValue } from './CustomValidationDecorators'

class UserValidator {
    @Length(1, 50, {
        message: '用户名不能为空且长度范围必须为1~50个字符'
    })
    name: string;

    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string;
}

export class UserRegisterValidator extends UserValidator {

    // 确认密码需要进行自定义验证
    // ValidateIf校验o.password是否存在，存在才继续校验下一个规则
    @ValidateIf(o => o.password)
    @IsSameValue('password', {
        message: '两次输入密码不一致'
    })
    rePassword: string;
}


export class UserLoginValidator extends UserValidator {

}