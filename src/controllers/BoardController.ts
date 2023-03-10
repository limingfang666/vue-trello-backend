import { Controller, Flow, Body, Post, Get, Put, Delete, Ctx,Params } from 'koa-ts-controllers';
import { BoardModel } from '../models/BoardModel';
import { Context } from 'koa';
 
// 引入业务逻辑错误处理
import Boom from '@hapi/Boom';
// 引入鉴权
import authorization from '../middlewares/authorization';
import { BoardIdValidator } from '../validators/BoardValidator'

@Controller('/board')
@Flow([authorization])
class BoardController {

    /**
     * 根据id查询一个面板
     */
    @Get('/board/:id(\\d+)')
    async getBoards(
        @Ctx() ctx: Context,
        @Params() id: BoardIdValidator
    ){
        let board = await BoardModel.findOne();
        console.log(board);
        if(!board){
            throw Boom.notFound("查找面板失败：","无面板相关记录");
        }
        ctx.status = 200;
        return {
            data:board,
            code: ctx.status,
            success: true
        }
    }

     /**
     * 查询所有面板
     */
    @Get('/getAllBoards')
    async getAllBoards(
        @Ctx() ctx: Context
    ){
        let boards = await BoardModel.findAll();
        if(boards.length===0){
            throw Boom.notFound("查找面板失败：","无面板相关记录");
        }
        ctx.status = 200;
        return {
            data:boards,
            code: 200,
            success: true
        }

    }
}
