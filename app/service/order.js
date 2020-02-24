'use strict';

const Service = require('egg').Service;

class orderService extends Service {
    async updateOrder() {
        const { ctx } = this;
        let data = await ctx.model.Order.find({
            status: 1
        });
        let updateArr = [];
        let newTime = new Date().getTime();
        data.forEach((item,index) => {
            console.log(index);
            if (newTime > item.order_close_time) {
                updateArr.push(item._id);
            }
        })
        const resultdData = await ctx.model.Order.updateMany({
            _id: { $in: updateArr }
        }, {
            status: 5
        })
        return resultdData;
    }
}

module.exports = orderService;