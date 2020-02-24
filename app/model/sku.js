module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const SkuSchema = new Schema({
        item_id: {    //商品id
            type: Schema.ObjectId,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        stock: {      //库存
            type: Number,
            require: true
        },
        price: {       //价格
            type: Number,
            require: true
        },
        price: {       //价格
            type: Number,
            require: true
        },
        original_price: {  //原价
            type: Number,
            default: 0
        },
        cost_price: {   //成本价
            type: Number,
            require: true
        },
        pic: {          //sku图片
            type: String,
            require: true
        },
        difference: {    //规格属性
            type: Array,
            require: true
        },
        skuType: {      //sku属于什么类型 促销、团购、秒杀等等(default默认、promotion促销、groupbuy团购)
            type: String,
            enum: ['default', 'promotion','groupbuy'],
            default: 'default'
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
    

    return mongoose.model('Sku', SkuSchema);
}