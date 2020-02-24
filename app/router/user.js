// 前端api接口相关路由
module.exports = app => {
    const { router, controller } = app;
    router.post('/v1/register', controller.api.user.register);
    router.post('/v1/login', controller.api.user.login);
}