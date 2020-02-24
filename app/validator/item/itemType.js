module.exports = app => {
    const Joi = app.Joi;
    return {
        index: Joi.object().keys({
            pid: Joi.string().required(),
            series: Joi.number().required(),
            name: Joi.string().required(),
            picture: Joi.string().required(),
            sort: Joi.number().required(),
            tree: Joi.string().required()
        }),
        getOne: Joi.object().keys({
            pid: Joi.string().required()
        }),
        getSeriesItemTypes: Joi.object().keys({
            series: Joi.string().required()
        })
    }
};