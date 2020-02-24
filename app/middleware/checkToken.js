'use strict';
module.exports = options => {
    return async function checkTokenIsLogin(ctx, next) {
        const token = ctx.request.get('Authorization');
        if (!token) {
            ctx.body = {
                code: -100,
                message: "请传入用户凭证！"
            };
            return;
        }
        // 捕获异常
        try {
            const tokenStatus = await ctx.service.token.decodingToken(token);
            /**
             * 1414 token过期
             * 1539 无效token
             */
            // if (tokenStatus.pid === 1414 || tokenStatus.pid === 1539) {
            //     ctx.body = {
            //         code: -100,
            //         data: err,
            //         message: "用户凭证错误,请重新登录！"
            //     };
            // }

            await next();
        } catch (err) {
            if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
                ctx.body = {
                    code: -100,
                    data: err,
                    message: "用户凭证错误,请重新登录！"
                };
            } else {
                ctx.body = {
                    code: -1,
                    data: err,
                    message: "服务端错误！"
                };
            }
            return;
        }
        
        
    };
};