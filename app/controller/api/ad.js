'use strict';

const BaseController = require('../base');

class AdController extends BaseController {
    // 添加广告位置
    async addAdPosition() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.ad.ad.addPosition);
        const params = ctx.request.body;
        const adPosition = await ctx.model.AdPosition(params);
        await adPosition.save();
        this.success('success!');
    }
    // 添加广告
    async addAd() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.ad.ad.addAd);
        const params = ctx.request.body;
        const ad = await ctx.model.Ad(params);
        await ad.save();
        this.success('success!');
    }
}

module.exports = AdController;
