module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const AttributesSchema = new Schema({
        name: {
            type: String, //规格名字
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

    return mongoose.model('Attributes', AttributesSchema);
}