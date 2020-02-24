// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    router.post('/v1/addItemType', controller.api.itemType.addItemType);
    router.get('/v1/getItemTypes', controller.api.itemType.getItemTypes);
    router.get('/v1/getOneItemTypes', controller.api.itemType.getOneItemTypes);
    router.get('/v1/getSeriesItemTypes', controller.api.itemType.getSeriesItemTypes);
}