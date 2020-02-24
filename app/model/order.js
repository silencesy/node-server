var mongoosePaginate = require('mongoose-paginate');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const OrderSchema = new Schema({
        user_id: {   //用户id
            type: Schema.ObjectId,
            require: true
        },
        status: {           //订单状态
            type: Number,
            require: true
        },
        goodsData: {       //商品信息
            type: Array,
            require: true
        },
        address: {         //地址
            type: Object,
            require: true
        },
        postage: {          //邮费
            type: Number,
            require: true
        },
        total_order_price: {    //订单总价
            type: Number,
            require: true
        },
        total_coupon_price: {   //订单优惠价
            type: Number,
            default: 0
        },
        place_order_time: {  //下单时间
            type: Number,
            default: +new Date()
        },
        pay_time: {     //支付时间
            type: Number,
            default: 0
        },
        send_time: {   //送货时间
            type: Number,
            default: 0
        },
        buyer_remark: {  //购买备注
            type: String,
            default: ''
        },
        pay_source: {  //支付方式
            type: String,
            enum: ['alipay', 'wechatpay']
        },
        code: {         //支付后凭证code 对于某些商品需要
            type: String,
            default: ''
        },
        is_delete: {  //是否删除
            type: Boolean,
            default: false
        },
        order_close_time: {
            type: Number,
            require: true
        },
        add_time: { // 时间戳
            type: Number,
            default: Date.now
        },
        update_time: { // 时间戳
            type: Number,
            default: Date.now
        }
    });
    OrderSchema.plugin(mongoosePaginate);
    return mongoose.model('Order', OrderSchema);
}