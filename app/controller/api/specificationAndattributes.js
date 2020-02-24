'use strict';

const BaseController = require('../base');
const md5 = require('md5')

class specificationAndattributesController extends BaseController {
    // 添加属性
    async addAttributes() {
        const { ctx, app: { validator } } = this;
        try {
            ctx.validate(validator.item.specificationAndattributes.index);
            const { name } = ctx.request.body;
            const findData = await ctx.model.Attributes.find({ name: name});
            if (findData.length>0) {
                this.error(`添加失败！${name}已经存在。`);
            } else {
                const newData = await new ctx.model.Attributes({
                    name
                })
                newData.save();
                this.success('success!');
            }
        } catch (err) {
            this.error(err);
        }
    }
    // 添加规格
    async addSpecification() {
        const { ctx, app: { validator } } = this;
        ctx.validate(validator.item.specificationAndattributes.index);
        const { name } = ctx.request.body;
        const findData = await ctx.model.Specification.find({ name: name });
        if (findData.length > 0) {
            this.error(`添加失败！${name}已经存在。`);
        } else {
            const newData = await new ctx.model.Specification({
                name
            })
            newData.save();
            this.success('success!');
        }
    }
    // 获取规格
    async getAttributesAndSpecification() {
        const { ctx } = this;
        const specificationData = await ctx.model.Specification.find();
        this.success({
            specificationData
        });
    }
}

module.exports = specificationAndattributesController;
