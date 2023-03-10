/*
 * @Description:项目启动入口文件
 * @Author: lmfang
 * @Date: 2022-09-20 16:15:53
 * @LastEditTime: 2023-03-04 13:12:11
 * @LastEditors: lmfang
 */
import configs from './configs/index'
// 因为 `Koa` 并不是 `TS` 编写的，且官方包中也没有提供对应的类型声明文件，所以我们需要单独安装   npm i -D @types/koa
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
        try {
            if(ctx.request.url!=="/api/v1/user/login" && ctx.request.url!=="/api/v1/user/register" ){
                ctx.userInfo = (jwt.verify(token, configs.jwt.jwtKey) as UserInfo);
            }
        } catch (error) {
            throw Boom.conflict("token信息有误");
        }
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

    //通过 `ts-node-dev` 工具来直接帮助我们编译并运行 `ts` 文件，同时它还有热重启的功能
    // npm i -D ts-node-dev
    // 同时因为 ts-node-dev 需要编译ts，所以还需要安装 typescript
    // npm i -D typescript
    app.listen(configs.server.port, Number(configs.server.host), () => {
        console.log(`服务启动成功： http://${configs.server.host}:${configs.server.port}`);
    });
})();

