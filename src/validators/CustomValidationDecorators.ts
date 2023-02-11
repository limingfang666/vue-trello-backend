/*
 * @Description: 自定义校验规则
 * @Author: lmfang
 * @Date: 2022-11-09 17:17:56
 * @LastEditTime: 2022-11-09 17:24:51
 * @LastEditors: lmfang
 */
import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

// property传入的要比较的属性值
export function IsSameValue(property: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isSameValue",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, validationArguments: ValidationArguments): Promise<boolean> | boolean {
                    // 根据上面的属性名称获取对应的值
                    const relatedValue = (validationArguments.object as any)[property];
                    // 比较当前装饰器装饰属性值与传入的第一个参数的值是否相同
                    // relatedValue为被比较值password，value为当前属性rePassword值
                    return relatedValue === value;
                }
            }
        });
    };
}