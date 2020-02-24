var mongoosePaginate = require('mongoose-paginate');
module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ItemSchema = new Schema({
        categories: {   //商品分类
            type: Schema.ObjectId,
            require: true
        },
        carousel: {     //轮播图
            type: [{
                pic: String
            }],
            default: []
        },
        name: {  //名字
            type: String,
            require: true
        },
        sales_volume: {  //销量
            type: Number,
            default: 0
        },
        pageviews: {  //浏览量
            type: Number,
            default: 0
        },
        promotions: {  //促销活动
            type: Array,
            default: []
        },
        service: {  //服务信息
            type: Array,
            default: ['7天无理由退换货 ·','假一赔十 ·']
        },
        details: {   //详情
            type: String,
            require: true
        },
        adder: {   //添加者
            type: String,
            default: ''
        },
        editor: {  // 修改者
            type: Array,
            default: []
        },
        is_delete: {  //是否删除
            type: Boolean,
            default: false
        },
        min_price: {  //最低价格
            type: Number,
            require: true
        },
        min_original_price: {  //最低原价
            type: Number,
            require: true
        },
        specifications: {
            type: Array,
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
    ItemSchema.plugin(mongoosePaginate);
    return mongoose.model('Item', ItemSchema);
}