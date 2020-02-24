module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        username: { type: String, },    //用户名
        nickname: { type: String },     //昵称
        password: {                     //密码
            type: String,
            require: true
        },
        mobile: {                       //电话号码
            type: String,
            require: true 
        },
        email: {                        //邮箱
            type: String,
            default: ''
         },
        gender: {                       //性别
            type: String,
            default: '男', //默认值
            enum: ['男', '女', '保密']
        },
        avatar: {                       //头像
            type: String,
            default: 'http://img4.imgtn.bdimg.com/it/u=198369807,133263955&fm=27&gp=0.jpg'
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

    return mongoose.model('User', UserSchema);
}