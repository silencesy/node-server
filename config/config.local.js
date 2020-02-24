/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568960220606_1542';

  // add your middleware config here
  config.middleware = [];

  config.middleware = [];

  //多出来的配置==========
  exports.security = {
    csrf: false
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  exports.jwt = {
    secret: "SunRain", //自己设置的值
    // enable: false,
  }

  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/mart',
      options: {}
    },
  };
  exports.joi = {
    options: {},
    locale: {
      'zh-cn': {}
    },
    throw: true, // throw immediately when capture exception
    throwHandle: (error) => { return error; }, // error message format when throw is true
    errorHandle: (error) => { return error; }, // error message format when throw is false
    resultHandle: (result) => { return result; } // fromat result
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
