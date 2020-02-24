'use strict';

const BaseController = require('../base');

class OrderController extends BaseController {
    // 订单预览
    async previewOrder() {
        const { ctx } = this;
        const { flag, sku_id, number } = ctx.request.query;
        if (flag === 'goodsDetails') {
            const data = await ctx.model.Sku.find({ _id: sku_id });
            // const goodsData = await ctx.model.Item.findById(data[0].item_id,{
            //     name: 1
            // });
            data[0].number = number;
            // data[0].name = goodsData.name;
            let totalPrice = data[0].price * number;
            this.success({
                data,
                totalPrice
            });
        } else if (flag === 'cart') {
            const data = await this.service.cart.getGoodsList(false);
            let totalPrice = 0;
            data.forEach(element => {
                totalPrice += element.price * element.number;
            });
            this.success({
                data,
                totalPrice
            });
        }
    }
    // 创建订单
    async creatOrder() {
        const { ctx } = this;
        let { addressId, skuInfo, buyer_remark, goodsDetailsOrCart} = ctx.request.body;
        const token = ctx.request.get('Authorization');
        const { id } = await ctx.service.token.decodingToken(token);
        let skuIdArr = [];
        const addressInfo = await ctx.model.UserAddress.findById(addressId,{
            mobile: 1,
            full_name: 1,
            address_details: 1,
            address_name: 1,
            house_number: 1
        });
        skuInfo.forEach(element=>{
            skuIdArr.push(element.sku_id)
        })
        const skuInfoData = await ctx.model.Sku.find({ _id: { $in: skuIdArr } }).lean();
        skuInfoData.reverse();
        console.log(skuInfoData);
        let total_order_price = 0;
        skuInfoData.forEach((element,index)=>{
            total_order_price += element.price * skuInfo[index].number;
            element.number = skuInfo[index].number;
        })
        let order_close_time = new Date().getTime() + 300000;
        let params = {
            status: 1,
            goodsData: skuInfoData,
            address: addressInfo,
            postage: 0,
            total_order_price: total_order_price,
            buyer_remark: buyer_remark,
            user_id: id,
            order_close_time
        }
        let orderData = await new ctx.model.Order(params);
        const resultData = await orderData.save();
        if (goodsDetailsOrCart === 'cart') {
            
            await ctx.model.Cart.deleteMany({
                user_id: id,
                checked: true
            });
        }
        this.success(resultData._id);
    }
    // 订单列表
    async orderList() {
        const { ctx, app, app: { validator } } = this;
        const token = ctx.request.get('Authorization');
        const { id } = await ctx.service.token.decodingToken(token);
        ctx.validate(validator.order.order.orderList, ctx.request.query);
            const { status, page, pageSize } = ctx.request.query;
            let queryObj = {};
            if (status==0) {
                queryObj = {
                    user_id: id,
                    is_delete: false
                }
            } else {
                queryObj = {
                    status,
                    user_id: id,
                    is_delete: false
                }
            }
            
            const itemData = await ctx.model.Order.paginate(queryObj, {
                select: {
                    goodsData: 1,
                    total_coupon_price: 1,
                    status: 1,
                    total_order_price: 1,
                    add_time: 1
                },
                sort: {
                    add_time: -1
                },
                page: Number(page),
                limit: Number(pageSize)
            });
        this.success(itemData);
    }
    // 订单详情
    async orderDetails() {
        const { ctx, app: { validator }} = this;
        const token = ctx.request.get('Authorization');
        const { id } = await ctx.service.token.decodingToken(token);
        ctx.validate(validator.order.order.orderDetails, ctx.request.query);
        const { orderNumber } = ctx.request.query;
        let data = await ctx.model.Order.findOne({ 
            _id: orderNumber,
            user_id: id
        },{
            address: 1,
            buyer_remark: 1,
            goodsData: 1,
            place_order_time: 1,
            pay_time: 1,
            postage: 1,
            send_time: 1,
            status: 1,
            total_coupon_price: 1,
            total_order_price: 1
        }).lean();
        data.place_order_time = ctx.service.utils.getLocalTime(data.place_order_time);
        this.success(data);
    }
}

module.exports = OrderController;
