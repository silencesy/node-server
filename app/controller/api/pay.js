'use strict';

const BaseController = require('../base');

class payController extends BaseController {
    async unifiedOrder() {
        const { app } = this;
        // console.log(123123123);
        const result = await app.tenpay.getPayParams({
            out_trade_no: '112233445566',
            body: '商品简单描述',
            total_fee: '10',
            openid: 'ssss'
        });
        // console.log(data);
        this.success(result);
    }
}

module.exports = payController;
