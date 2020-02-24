module.exports = app => {
    const { router, controller } = app;
    const checkToken = app.middleware.checkToken();
    router.get('/v1/unifiedOrder', controller.api.pay.unifiedOrder);
}
