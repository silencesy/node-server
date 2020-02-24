module.exports = app => {
    const Joi = app.Joi;
    return {
        creatOrder: Joi.object().keys({
            addressId: Joi.string().required(),
            skuInfo: Joi.string().required(),
            buyer_remark: Joi.string(),
            goodsDetailsOrCart: Joi.string().required()
        }),
        orderList: Joi.object().keys({
            status: Joi.string().required(),
            page: Joi.number().required(),
            pageSize: Joi.number().required()
        }),
        orderDetails: Joi.object().keys({
            orderNumber: Joi.string().required(),
        })
    }
};