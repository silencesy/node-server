module.exports = {
    schedule: {
        interval: '60m', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        const res = await ctx.service.order.updateOrder();
        console.log(res);
    },
};