import { IsNumberString } from 'class-validator'
export class BoardIdValidator{
    @IsNumber({
        message: '密码不能为空'
    })
    id: number;
} 