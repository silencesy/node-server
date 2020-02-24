// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    const checkToken = app.middleware.checkToken();
    router.post('/v1/addAddress', checkToken ,controller.api.address.addAddress);
    router.get('/v1/getAddress', checkToken, controller.api.address.getAddress);
    router.post('/v1/editAddress', checkToken, controller.api.address.editAddress);
    router.post('/v1/deleteAddress', checkToken, controller.api.address.deleteAddress);
    router.get('/v1/getDefaultAddress', checkToken, controller.api.address.getDefaultAddress);
}