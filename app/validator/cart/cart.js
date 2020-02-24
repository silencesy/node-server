module.exports = app => {
    const Joi = app.Joi;
    return {
        addCart: Joi.object().keys({
            sku_id: Joi.string().required(),
            number: Joi.number().required()
        }),
        eidtCart: Joi.object().keys({
            number: Joi.number(),
            checked: Joi.boolean(),
            allChecked: Joi.boolean(),
            _id: Joi.string()
        }),
        deleteCart: Joi.object().keys({
            _id: Joi.string(),
            allDelete: Joi.boolean()
        })
    }
};