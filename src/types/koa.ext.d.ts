/*
 * @Description: 多Koa进行扩展，使用userInfo信息的类型声明文件
 * @Author: lmfang
 * @Date: 2022-11-10 16:34:43
 * @LastEditTime: 2022-11-14 11:07:13
 * @LastEditors: lmfang
 */
// 继承原有koa
import koa from 'koa';

declare module 'koa' {

    interface Context {
        userInfo: UserInfo
    }

}

