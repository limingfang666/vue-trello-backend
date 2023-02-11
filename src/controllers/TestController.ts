/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-10-09 16:38:59
 * @LastEditTime: 2022-11-04 16:47:05
 * @LastEditors: lmfang
 */

import { Controller, Get, Post, Params, Query, Body, Header, Ctx } from 'koa-ts-controllers'
// 验证前端数据格式是否错误
import { GetUserQuery, TestPostUserBody } from '../validators/GetUserQueryTest';
// 验证业务逻辑错误
import Boom from '@hapi/Boom';
// ctx返回
import { Context } from 'koa'

@Controller("/test")
class TestController {

    @Get('/hello')
    async sayHello(a: any) {
        // 测试错误处理，没有添加错误处理：{"error":"Internal Server Error"}
        //添加错误处理后报错： {"statusCode":500,"error":"Internal Server error","message":"An internal server error occurred"}
        console.log(a.b);

        return "Hello Test"
    }

    @Get('/getUserParams/:id(\\d+)')
    async getUserParams(
        @Params() params: { id: number }
    ) {
        console.log(params.id);
        return params.id;
    }

    @Get('/getUserParams2/:id(\\d+)')
    async getUserParams2(
        @Params('id') id: number
    ) {
        console.log(id);
        return id;
    }


    // postman中的params即queryString
    @Get('/getUserQuery')
    async getUserQuery(
        @Query('id') id: number
    ) {
        console.log("Querystring的id为：" + id);
        return "Querystring的id为：" + id;
    }

    // 使用验证类验证Query
    @Get('/getUserQuery')
    async getUserQuery2(
        @Query('id') id: number
    ) {
        // @Query('id') id: number这里number是后端代码编写的一种验证，无法验证前端传递过来的值是否正确，传统做法只能判断id然后进行约束
        console.log("Querystring的id为：" + id);
        return "Querystring的id为：" + id;
    }


    // 使用body需要安装koa-bodyparser的第三方body解析库
    @Post('/postUser')
    async postUser(
        @Body() body: {
            username: string,
            password: string
        },
        @Header() header: any
    ) {
        // return `当前提交的数据是：${JSON.stringify(body)}`;
        return header;
        // return {
        //     "用户名": body.username,
        //     "密码": body.password
        // }
    }

    @Get('/getUserQueryValidator')
    async getUserQueryValidator(
        @Query() page: GetUserQuery
    ) {
        // 验证业务逻辑错误
        if (true) {
            // 如果nodejs版本在v15.0.0以下不能直接使用throw，会抛出错误UnhandledPromiseRejectionWarning错误:包版本冲突，class-validator，koa-router，koa-ts-controllers三者要对应版本才行
            throw Boom.notFound("注册失败", "用户不存在");
        }

        // return `传过来的数据是:` + JSON.stringify(page);
    }

    @Post('/postUserPm')
    async postUserPm(
        @Ctx() ctx: Context,
        @Body() body: TestPostUserBody
    ) {

        // 为测试postman的断言测试功能
        ctx.status = 201;

        return {
            name: body.name
        }
    }

}