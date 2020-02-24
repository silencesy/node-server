// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    const checkToken = app.middleware.checkToken();
    router.get('/v1/previewOrder', checkToken, controller.api.order.previewOrder);
    router.get('/v1/orderList', checkToken,controller.api.order.orderList);
    router.get('/v1/orderDetails', checkToken, controller.api.order.orderDetails);
    router.post('/v1/creatOrder', checkToken, controller.api.order.creatOrder);
}
