// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    router.post('/v1/addAdPosition', controller.api.ad.addAdPosition);
    router.post('/v1/addAd', controller.api.ad.addAd);
}