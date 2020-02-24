'use strict';

const BaseController = require('../base');
const md5 = require('md5')

class AddressController extends BaseController {
    // 添加地址
    async addAddress() {
        const { ctx, app: { validator } } = this;
        try {
            ctx.validate(validator.user.address.add);
            const token = ctx.request.get('Authorization');
            const { id } = await ctx.service.token.decodingToken(token);
            const params = ctx.request.body;
            params.user_id = id;
            // const countNumber = await ctx.model.UserAddress.countDocuments({
            //     user_id: id,
            //     is_delete: false
            // });
            // console.log(countNumber);
            // 如果当前地址设置为默认地址，那么先更新其他数据为false
            if (params.is_default) {
                await ctx.model.UserAddress.updateMany({
                    user_id: id
                },{
                    is_default: false
                })
            }
            let userAddress = await new ctx.model.UserAddress(params)
            await userAddress.save()
            this.success('success!');
        } catch (err) {
            this.error(err);
        }
    }
    // 修改地址
    async editAddress() {
        const { ctx, app: { validator } } = this;
        try {
            ctx.validate(validator.user.address.edit);
            const params = ctx.request.body;
            const { _id } = params;
            // 如果当前地址设置为默认地址，那么先更新其他数据为false
            const token = ctx.request.get('Authorization');
            const { id } = await ctx.service.token.decodingToken(token);
            if (params.is_default) {
                await ctx.model.UserAddress.updateMany({
                    user_id: id
                }, {
                    is_default: false
                }).then(data => {
                    console.log(data);
                })
                    .catch(err => console.log(err));

            }
            const data = await ctx.model.UserAddress.findByIdAndUpdate(_id, params);
            this.success(data);
        } catch (err) {
            this.error(err);
        }
    }
    // 获取地址列表
    async getAddress() {
        const { ctx } = this;
        // console.log('123123');
        try {
            const token = ctx.request.get('Authorization');
            const { id } = await ctx.service.token.decodingToken(token);
            const addressList = await ctx.model.UserAddress.find({ user_id: id, is_delete: false},{
                address_details: 1,
                address_name: 1,
                full_name: 1,
                house_number: 1,
                mobile: 1,
                is_default: 1,
            });
            // console.log(addressList);
            this.success(addressList);
        } catch (err) {
            this.error(err);
        }
    }
    // 删除地址列表
    async deleteAddress() {
        const { ctx , app: { validator } } = this;
        try {
            ctx.validate(validator.user.address.deleteAddress);
            const { _id } = ctx.request.body;
            const data = await ctx.model.UserAddress.findByIdAndUpdate(_id,{
                is_delete: true
            });
            this.success('success!');
        } catch (err) {
            this.error(err);
        }
    }
    // 获取默认地址
    async getDefaultAddress() {
        const { ctx } = this;
        const token = ctx.request.get('Authorization');
        const { id } = await ctx.service.token.decodingToken(token);
        try {
            const data = await ctx.model.UserAddress.find({
                user_id: id,
                is_default: true,
                is_delete: false
            });
            // 如果有设置默认地址就取默认地址，如果没有就取所有地址
            if (data.length>0) {
                this.success(data);
            } else {
                const data = await ctx.model.UserAddress.find({
                    user_id: id,
                    is_delete: false
                });
                this.success(data);
            }
            
        } catch (err) {
            this.error(err);
        }
    }
}

module.exports = AddressController;
