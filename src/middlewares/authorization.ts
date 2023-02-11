/*
 * @Description: 用于鉴权的中间件函数(主要就是验证userInfo里有没有登录信息)
 * @Author: lmfang
 * @Date: 2022-11-10 17:32:54
 * @LastEditTime: 2022-11-10 17:37:17
 * @LastEditors: lmfang
 */
import { Context, Next } from 'koa'
import Boom from '@hapi/Boom'

export default async function authorization(
    ctx: Context,
    next: Next
) {
    if (!ctx.userInfo || ctx.userInfo.id < 1) {
        throw Boom.unauthorized("无权访问，请先登录");
    }
    await next();
}