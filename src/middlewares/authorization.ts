/*
 * @Description: 用于鉴权的中间件函数(主要就是验证userInfo里有没有登录信息)
 * @Author: lmfang
 * @Date: 2022-11-10 17:32:54
 * @LastEditTime: 2023-03-05 12:28:24
 * @LastEditors: lmfang
 */
import { Context, Next } from 'koa'
import Boom from '@hapi/Boom'

// 鉴权
import jwt from 'jsonwebtoken';
import configs from '../configs';

export default async function authorization(
    ctx: Context,
    next: Next
) {
    // 校验是否存在userInfo
    if (!ctx.userInfo || ctx.userInfo.id < 1) {
        throw Boom.unauthorized("无权访问，请先登录");
    }

    // 校验请求头里是否存在token
    let authorization = ctx.request.header.authorization;
    
    if(!authorization){
      ctx.body = {
        code: 1,
        data:{},
        error: 400,
        mes: '没有权限请求'
      }
      throw Boom.unauthorized("token不存在，没有权限请求");
    }
    authorization = authorization.split(' ')[1];
   
    try{
      let data = await jwt.verify(authorization, configs.jwt.jwtKey);
    }catch(err){
      if(err.name === 'TokenExpiredError'){
        // 过期把数据库中也清除
        // jwt.decode(authorization, async function(err, data){
        //     await service.actionToken.deleteToken({userId: payload._id});
        // })
        ctx.body = {
            code: 1,
            data:{},
            error: 400,
            mes: '登录已过期，请重新登录'
          }
          throw Boom.unauthorized("token失效");
      }
    }

    // 判断是否合法(decode方法里面必须是对象)
    if(typeof authorization === "string"){
      let decode = await jwt.decode(JSON.parse(authorization));

      if(!decode){
        ctx.body = {
          code: 1,
          data:{},
          error: 400,
          mes: 'token不合法，请检查后重试'
        }
        throw Boom.unauthorized("token不合法，请检查后重试");
      }
    }
    

    await next();
}