module.exports = app => {
    const Joi = app.Joi;
    return {
        index: Joi.object().keys({
            name: Joi.string().required()
        })
    }
};