module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ItemTypeSchema = new Schema({
        pid: {              //父id
            type: String,
            require: true,
            index: true
        },
        name: {             //分类名字
            type: String,
            require: true
        },
        picture: {          //分类图片
            type: String,
            require: true
        },
        series: {           //分类级数
            type: Number,
            require: true,
            index: true
        },
        sort: {             //分类排序
            type: Number,
            require: true,
        },
        tree: {             //分类树状
            type: String,
            index: true,
            set(params) {
                if (params != 0 || !params) {
                    return params + '.' + this._id
                } else {
                    return this._id
                }
            }
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

    return mongoose.model('ItemType', ItemTypeSchema);
}