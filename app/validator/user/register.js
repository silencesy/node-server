module.exports = app => {
    const Joi = app.Joi;
    return {
        index: Joi.object().keys({
            mobile: Joi.number().required(),
            password: Joi.string().regex(/(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/).required(),
            repeatPassword: Joi.string().regex(/(?=.*([a-zA-Z].*))(?=.*[0-9].*)[a-zA-Z0-9-*/+.~!@#$%^&*()]{6,20}$/).required()
        })
    }
};