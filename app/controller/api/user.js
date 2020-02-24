'use strict';

const BaseController = require('../base');
const md5 = require('md5')

class UserController extends BaseController {
    // 注册
    async register() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.user.register.index);
        
        const { mobile, password } = ctx.request.body;
        const userInfo = await ctx.model.User.find({
            mobile
        })
        if (userInfo.length===0) {
            let user = await new ctx.model.User({
                username: mobile,
                nickname: mobile,
                mobile: mobile,
                password: md5(password)
            })
            await user.save()
            this.success('注册成功！');
        } else {
            this.error('手机号已经存在，请直接登录！');
        }
        
    }
    // 登录
    async login() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.user.login.index);
        const { mobile, password } = ctx.request.body;
        let data = await ctx.model.User.findOne({ mobile },{
            avatar: 1,
            email: 1,
            gender: 1,
            mobile: 1,
            nickname: 1,
            username: 1,
            password: 1
        });
        if(!data) {
            this.error('该用户不存在！');
        } else if (data.password !== md5(password)) {
            this.error('密码错误');
        } else {
            const token = await this.service.token.setToken(data._id);
            this.success({
                token,
                userInfo: data
            });
        }
    }
}

module.exports = UserController;
