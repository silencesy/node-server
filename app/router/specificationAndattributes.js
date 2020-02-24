module.exports = app => {
    const { router, controller } = app;
    router.post('/v1/addAttributes', controller.api.specificationAndattributes.addAttributes);
    router.post('/v1/addSpecification', controller.api.specificationAndattributes.addSpecification);
    router.get('/v1/getAttributesAndSpecification', controller.api.specificationAndattributes.getAttributesAndSpecification);
}