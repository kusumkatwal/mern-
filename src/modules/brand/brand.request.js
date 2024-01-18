const Joi = require('joi');

const brandCreateSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    tagline: Joi.string().uri().required(),
    status: Joi.string().regex(/^(active|inactive)$/).default('inactive')
})

module.exports = {brandCreateSchema}