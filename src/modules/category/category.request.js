const Joi = require('joi');

const categoryCreateSchema = Joi.object({
    category: Joi.string().min(3).max(100).required(),
    sub_category: Joi.string().uri().required(),
    status: Joi.string().regex(/^(active|inactive)$/).default('inactive')
})

module.exports = {categoryCreateSchema}