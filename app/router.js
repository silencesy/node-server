'use strict';

/**
 * 
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app)
  require('./router/item')(app)
  require('./router/itemType')(app)
  require('./router/address')(app)
  require('./router/ad')(app)
  require('./router/home')(app)
  require('./router/cart')(app)
  require('./router/specificationAndattributes')(app)
  require('./router/order')(app)
  require('./router/pay')(app)
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('file', '/api/v1/file', controller.api.upload.creates);
};
