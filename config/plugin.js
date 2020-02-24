'use strict';

/** @type Egg.EggPlugin */
exports.jwt = {
  enable: true,
  package: "egg-jwt"
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
};
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
exports.joi = {
  enable: true,
  package: 'egg-joi',
};
exports.tenpay = {
  enable: true,
  package: 'egg-tenpay'
};
exports.http = {
  enable: true,
  package: 'egg-axios'
}
// exports.security = {
//   domainWhiteList: ['http://localhost:8080','http://192.168.0.125:8080'],
// };
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
