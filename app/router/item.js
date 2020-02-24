module.exports = app => {
    const { router, controller } = app;
    router.post('/v1/addItem', controller.api.item.addItem);
    router.get('/v1/getItem', controller.api.item.getItem);
    router.get('/v1/getItemList', controller.api.item.getItemList);
}