'use strict';

const BaseController = require('../base');

class HomeController extends BaseController {
    async homeData() {
        const { ctx } = this;
        const swiper = await ctx.model.Ad.find({ ad_position_id: '5da82e6c92ac8ef466e029f3', status: true},{
            content_type: 1,
            pic: 1,
            url: 1,
            sort: 1
        }).sort({ sort: 1});
        try {
            this.success({
                swiper
            });
        } catch (err) {
            this.error(err);
        }
    }
}

module.exports = HomeController;
