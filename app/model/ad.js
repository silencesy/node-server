module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AdSchema = new Schema({
        ad_position_id: {           //广告位置id
            type: Schema.ObjectId,
            require: true
        },
        content_type: {     //广告类型
            type: String,
            enum: ['goods','url'],
            require: true
        },
        status: {           //广告状态
            type: Boolean,
            default: false
        },
        clicks: {           //广告点击量
            type: Number,
            default: 0
        },
        sort: {                //广告排序
            type: Number,
            require: true
        },
        pic: {                  //广告主图
            type: String,
            default: ''
        },
        url: {              //广告链接
            type: String,
            default: ''
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

    return mongoose.model('Ad', AdSchema);
}