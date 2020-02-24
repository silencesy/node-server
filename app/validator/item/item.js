module.exports = app => {
    const Joi = app.Joi;
    return {
        addItem: Joi.object().keys({
            categories: Joi.string().required(),
            carousel: Joi.array().required(),
            name: Joi.string().required(),
            details: Joi.string().required(),
            specifications: Joi.array().required(),
            sku: Joi.array().required()
        }),
        getItem: Joi.object().keys({
            _id: Joi.string().required()
        }),
        getItemList: Joi.object().keys({
            categories: Joi.string().required(),
            sort: Joi.string().required(),
            page: Joi.number().required(),
            pageSize: Joi.number().required(),
        }),
    }
};