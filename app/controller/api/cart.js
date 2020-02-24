'use strict';

const BaseController = require('../base');


class CartController extends BaseController {
    // 添加购物车
    async addCart() {
        const { ctx, app: { validator } } = this;

        try {
            ctx.validate(validator.cart.cart.addCart);
            let { sku_id, number } = ctx.request.body;
            const params = {
                sku_id,
                number
            }
            const token = ctx.request.get('Authorization');
            const { id } = await ctx.service.token.decodingToken(token);
            params.user_id = id;
            const data = await ctx.model.Cart.find({
                sku_id: params.sku_id ,
                user_id: params.user_id
            })
            /**
             * 加入购物车  如果有就更新数量 没有就加入新的一条数据
             */
            if (data.length>0) {
                await ctx.model.Cart.findOneAndUpdate({
                    sku_id: params.sku_id,
                    user_id: params.user_id
                },{
                    number: data[0].number + params.number
                });
            } else {
                let ItemType = await new ctx.model.Cart(params)
                await ItemType.save();
            }
            this.success('success!');
        } catch (err) {
            this.error(err);
        }
    }
    // 获取购物车列表
    async getCartList() {
        const data = await this.service.cart.getGoodsList(true);
        this.success(data);
    }
    // 删除购物车
    async deleteCart() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.cart.cart.deleteCart);
        let { _id, allDelete} = ctx.request.body;
        if (_id) {
            await ctx.model.Cart.findByIdAndRemove(_id);
            this.success('success!');
        } else if (allDelete) {
            const token = ctx.request.get('Authorization');
            const { id } = await ctx.service.token.decodingToken(token);
            await ctx.model.Cart.deleteMany({
                user_id: id
            });
            this.success('success!');
        }
    }
    // 编辑购物车
    async editCart() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.cart.cart.eidtCart);
        let { checked, _id, number, allChecked } = ctx.request.body;

        // 修改选中
        if (checked!=undefined) {
            let params = {
                checked
            }
            const data = await ctx.model.Cart.findByIdAndUpdate(_id, params);
            this.success('success!');
        } else if (number) { // 修改数量
            let params = {
                number
            }
            const data = await ctx.model.Cart.findByIdAndUpdate(_id, params);
            this.success('success!');
        } else if (allChecked != undefined) { // 修改选中
            const token = ctx.request.get('Authorization');
            const { id } = await ctx.service.token.decodingToken(token);
            await ctx.model.Cart.updateMany({
                user_id: id
            }, {
                checked: allChecked
            })
            this.success('success!');
        } else {
            this.error('请传正确的参数！');
        }
    }
}

module.exports = CartController;
