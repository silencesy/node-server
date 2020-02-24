module.exports = app => {
    const { router, controller } = app;
    router.get('/v1/home', controller.api.home.homeData);
}