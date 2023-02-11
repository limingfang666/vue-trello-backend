/*
 * @Description:项目启动入口文件
 * @Author: lmfang
 * @Date: 2022-09-20 16:15:53
 * @LastEditTime: 2022-11-16 16:34:01
 * @LastEditors: lmfang
 */
import configs from './configs/index'
import Koa, { Context, Next } from 'koa'

//koa-ts-controllers相关依赖
import { bootstrapControllers } from 'koa-ts-controllers'
import koaRouter from 'koa-router';
import koaBody from 'koa-body'
import Boom from '@hapi/Boom';

import { Sequelize } from 'sequelize-typescript'
import jwt from 'jsonwebtoken'

const router = new koaRouter();

const app = new Koa();

// 链接数据库
app.context.db = new Sequelize({
    ...configs.database,
    models: [__dirname + '/models/**/*']
});

// 统一处理鉴权
app.use(async (ctx: Context, next: Next) => {
    // 获取头信息中的token
    let token = ctx.headers['authorization'];

    if (token) {
        // koa的context中本身没有userInfo信息，需要自定义类型文件
        // UserInfo接口声明在global.d.ts文件中
        ctx.userInfo = (jwt.verify(token, configs.jwt.jwtKey) as UserInfo);
    }
    await next();
});

(async () => {
    await bootstrapControllers(app, {
        router: router,
        basePath: '/api',
        versions: [1],
        controllers: [__dirname + '/controllers/**/*'],

        errorHandler: async (err: any, ctx: Context) => {

            let status = 500;
            let body: any = {
                statusCode: status,
                error: "Internal Server error",
                message: "An internal server error occurred"
            }

            // 500错误以外，其他业务逻辑本身存在的错误另外处理
            console.log(err);
            if (err.output) {
                status = err.output.statusCode;
                body = { ...err.output.payload }
                // 如果当前err选项有data表示有错误详情
                if (err.data) {
                    body.errorDetail = err.data;
                }
            }

            ctx.status = status;
            ctx.body = body;
        }
    });


    router.all('*', async ctx => {
        throw Boom.notFound("此路由不存在");
    });

    // 处理post传入的body数据需要使用koa-body进行处理
    // app.use(koaBodyParser());
    app.use(koaBody({
        multipart: true
    }))
    app.use(router.routes());

    app.listen(configs.server.port, Number(configs.server.host), () => {
        console.log(`服务启动成功： http://${configs.server.host}:${configs.server.port}`);
    });
})();

