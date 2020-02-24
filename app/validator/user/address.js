module.exports = app => {
    const Joi = app.Joi;
    return {
        add: Joi.object().keys({
            mobile: Joi.number().required(),
            full_name: Joi.string().required(),
            address_details: Joi.string().required(),
            address_name: Joi.string().required(),
            house_number: Joi.string().required(),
            is_default: Joi.boolean().required()
        }),
        edit: Joi.object().keys({
            _id: Joi.string().required(),
            mobile: Joi.number().required(),
            full_name: Joi.string().required(),
            address_details: Joi.string().required(),
            address_name: Joi.string().required(),
            house_number: Joi.string().required(),
            is_default: Joi.boolean().required()
        }),
        deleteAddress: Joi.object().keys({
            _id: Joi.string().required()
        })
    }
};