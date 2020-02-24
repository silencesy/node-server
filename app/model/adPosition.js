module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AdPositionSchema = new Schema({
        name: {             //广告位置名字
            type: String,
            require: true
        },
        descript: {         //广告位置描述
            type: String,
            require: true
        },
        status: {           //广告状态
            type: Boolean,
            default: true
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

    return mongoose.model('AdPosition', AdPositionSchema);
}