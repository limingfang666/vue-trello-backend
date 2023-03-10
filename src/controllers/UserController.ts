/*
 * @Description: 
 * @Author: lmfang
 * @Date: 2022-11-09 17:05:37
 * @LastEditTime: 2023-03-05 12:56:27
 * @LastEditors: lmfang
 */

import { Controller, Flow, Post, Body, Ctx } from 'koa-ts-controllers'
import { UserRegisterValidator, UserLoginValidator } from '../validators/UserValidator'
import { UserModel } from '../models/UserModel'
import Boom from '@hapi/Boom'
import { Context } from 'koa';
// 用户面加密
import crypto from 'crypto';
// 鉴权
import jwt from 'jsonwebtoken';
import configs from '../configs';

// 通过 `koa-ts-controllers` 提供的 `Flow` 装饰器进行中间件的挂载
import authorization from '../middlewares/authorization'


@Controller('/user')
// @Flow([authorization])
class UserController {

    @Post('/register')
    // @Flow([authorization])
    async register(
        @Ctx() ctx: Context,
        @Body() user: UserRegisterValidator
    ) {
        // 判断用户是否存在，已存在直接返回错误信息(Boom)
        let { name, password } = user;
        let registerUser = await UserModel.findOne({
            where: { name }
        })
        if (registerUser) {
            throw Boom.conflict("注册失败", "用户信息已存在！");
        }

        // 用户不存在，创建用户并返回用户信息
        let newUser = new UserModel();
        newUser.name = name;
        newUser.password = password;

        await newUser.save();

        // 返回状态码和数据（获取 get 200, 创建post 201,更新/删除 put/delete 204；请求资源错误404; 请求参数异常422 ；未授权/登录：401；禁止访问：403）
        ctx.status = 201;
        return ctx.body = {
            id: newUser.id,
            name,
            createAt: newUser.createdAt,
        }
    }

    @Post("/login")
    // @Flow([authorization])
    async login(
        @Ctx() ctx: Context,
        @Body() user: UserLoginValidator
    ) {
        let { name, password } = user;
        // 检查用户名
        let loginUser = await UserModel.findOne({
            where: { name }
        });
        // 检查密码
        let md5 = crypto.createHash('md5');
        password = md5.update(password).digest("hex");

        // 登录：查询是否存在该用户，不存在，错误提示
        if (!loginUser || loginUser.password !== password) {
            throw Boom.forbidden("登录失败", "用户名或密码错误");
        }

        // 用户登录成功后，生成token并返回，用于鉴权
        let userInfo = {
            id: loginUser.id,
            name: loginUser.name,
        }

        let token = jwt.sign(userInfo, configs.jwt.jwtKey, { expiresIn: 60 * 60 });
        
        // 将token设置到返回头信息中
        ctx.set("authorization", token);

        // 存在则返回数据
        ctx.status = 201;
        return userInfo;
    }

} 