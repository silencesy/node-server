module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const CartSchema = new Schema({
        user_id: {   //用户id
            type: Schema.ObjectId,
            require: true
        },
        sku_id: {       //sku id
            type: Schema.ObjectId,
            require: true
        },
        number: {       //数量
            type: Number,
            require: true
        },
        attributes: {
            type: String,
            require: true
        },
        checked: {
            type: Boolean,
            default: true
        },
        name: {    //商品名字
            type: String,
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

    return mongoose.model('Cart', CartSchema);
}