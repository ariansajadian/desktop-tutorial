const Joi = require('joi');

const schemaValidate =  Joi.object({
    user_name:Joi.string().min(1).required(),
    first_name:Joi.string().min(1).required(),
    last_name:Joi.string().min(1).required()
})
module.exports = {
    schemaValidate
}
