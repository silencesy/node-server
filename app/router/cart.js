// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    const checkToken = app.middleware.checkToken();
    router.post('/v1/addCart', checkToken, controller.api.cart.addCart);
    router.post('/v1/editCart', checkToken, controller.api.cart.editCart);
    router.post('/v1/deleteCart', checkToken, controller.api.cart.deleteCart);
    router.get('/v1/getCartList', checkToken, controller.api.cart.getCartList);
}
