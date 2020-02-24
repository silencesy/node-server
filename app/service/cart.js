'use strict';

const Service = require('egg').Service;

class CartService extends Service {
    /**
     * 
     * id用户id
     * flag 标识是购物车还是预览页（ture为购物车，false为预览页）
     */
    // 
    async getGoodsList(flag) {
        const { ctx } = this;
        const token = ctx.request.get('Authorization');
        const { id } = await ctx.service.token.decodingToken(token);
        
        if (flag) {
            var findParams = {
                user_id: id
            }
            var resultParams = {
                sku_id: 1,
                name: 1,
                number: 1,
                checked: 1
            }
        } else {
            var  findParams = {
                user_id: id,
                checked: true
            }
            var resultParams = {
                sku_id: 1,
                name: 1,
                number: 1
            }
        }
        const data = await ctx.model.Cart.find(findParams, resultParams).lean();
        let skuIdArr = [];
        data.forEach((element) => {
            skuIdArr.push(element.sku_id);
        })
        // const skuArrInfo = await this.service.sku.getSkuInfo(skuIdArr);
        const skuArrInfo = await ctx.model.Sku.find({ _id: { $in: skuIdArr } }).lean();
        console.log(skuArrInfo);
        // 查询的数据和传入的数组是相反的 所以需要倒序一下
        skuArrInfo.reverse();
        data.forEach((element, index) => {
            element.original_price = skuArrInfo[index].original_price;
            element.skuType = skuArrInfo[index].skuType;
            element.stock = skuArrInfo[index].stock;
            element.price = skuArrInfo[index].price;
            element.item_id = skuArrInfo[index].item_id;
            element.pic = skuArrInfo[index].pic;
            element.difference = skuArrInfo[index].difference;
            element.name = skuArrInfo[index].name;
        })
        // console.log(data);
        return data;
    }
}

module.exports = CartService;