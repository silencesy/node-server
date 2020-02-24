'use strict';

const Service = require('egg').Service;

class ToolsService extends Service {
    async setToken(userId) {
        const { app } = this;
        let data = await app.jwt.sign({ id: userId }, app.config.jwt.secret,{
            expiresIn: 60*60*24
        });
        return data;
    }
    async decodingToken(token) {
        const { app } = this;
        let data = await app.jwt.verify(token, app.config.jwt.secret);
        return data;
    }
    async sumNumber(arr,attr) {
        let sum = 0;
        arr.forEach(item=>{
            console.log(item[attr])
            sum += item[attr];
        })
        return sum;
    }
}

module.exports = ToolsService;