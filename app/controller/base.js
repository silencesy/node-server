// 父类
'use strict';

const Controller = require('egg').Controller;
class BaseController extends Controller {
    async success(data) {
        this.ctx.body = {
            code: 1,
            data: data,
            message: 'success！'
        }
    }

    async error(msg, code = -1) {
        this.ctx.body = {
            code,
            msg
        }
    }
}

module.exports = BaseController;