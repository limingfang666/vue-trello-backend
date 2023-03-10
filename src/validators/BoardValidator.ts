import { IsNumberString } from 'class-validator'
export class BoardIdValidator{
    @IsNumberString()
    id: number;
} 