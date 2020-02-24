module.exports = app => {
    const Joi = app.Joi;
    return {
        addPosition: Joi.object().keys({
            name: Joi.string().required(),
            descript: Joi.string().required()
        }),
        addAd: Joi.object().keys({
            ad_position_id: Joi.string().required(),
            content_type: Joi.string().required(),
            sort: Joi.number().required(),
            pic: Joi.string().required(),
            url: Joi.string().required()
        })
    }
};