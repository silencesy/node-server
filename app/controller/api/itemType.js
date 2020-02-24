'use strict';

const BaseController = require('../base');

class ItemTypeController extends BaseController {
    async addItemType() {
        const { ctx, app: { validator } } = this;
        try {
            ctx.validate(validator.item.itemType.index);
            let { pid, name, picture, series, sort, tree} = ctx.request.body;
            const params = {
                pid,
                name,
                picture,
                series,
                sort,
                tree
            }
            let ItemType = await new ctx.model.ItemType(params)
            await ItemType.save();
            this.success('success!');
        } catch(err) {
            this.error(err);
        }
    }
    async getItemTypes() {
        const { ctx } = this;
        try {
            
            let ItemTypes = await ctx.model.ItemType.find({},{
                name: 1,
                picture: 1,
                series: 1,
                pid: 1
            });
            this.success(ItemTypes);
        } catch (err) {
            this.error(err);
        }
    }
    async getSeriesItemTypes() {
        const { ctx, app: { validator } } = this;
        try {
            ctx.validate(validator.item.itemType.getSeriesItemTypes, ctx.query);
            let { series } = ctx.query;
            let ItemTypes = await ctx.model.ItemType.find({
                series
            }, {
                name: 1,
                picture: 1,
                series: 1,
                pid: 1,
                tree: 1
            });
            this.success(ItemTypes);
        } catch (err) {
            this.error(err);
        }
    }
    async getOneItemTypes() {
        const { ctx, app: { validator } } = this;
        try {
            ctx.validate(validator.item.itemType.getOne, ctx.query);
            let { pid } = ctx.query;
            let ItemTypes = await ctx.model.ItemType.find({
                pid
            }, {
                name: 1,
                picture: 1,
                series: 1,
                pid: 1
            });
            this.success(ItemTypes);
        } catch (err) {
            this.error(err);
        }
    }
}

module.exports = ItemTypeController;
