module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserAddressSchema = new Schema({
        user_id: Schema.ObjectId, //用户id
        full_name: {    //用户名
            type: String,
            require: true
        },
        mobile: {        //电话号码
            type: Number,
            require: true
        },
        is_default: {    //是否默认      
            type: Boolean,
            require: true
        },
        is_delete: {        //是否删除
            type: Boolean,
            default: false
        },
        address_details: { //地址详情
            type: String,
            require: true
        },
        address_name: { //地址详情
            type: String,
            require: true
        },
        house_number: { //门牌号
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

    return mongoose.model('UserAddress', UserAddressSchema);
}