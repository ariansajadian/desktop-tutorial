const Joi = require('joi');

/// Schema Validate is not ready
 
/**async function (body) {
   const schema =  Joi.object().keys({ 
  password: Joi.string().min(1).required(),
  user_name: Joi.number().min(3).required(),
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  disableds: Joi.boolean()
  });
  
  const {error} = schema.validate(body)
     
    if(error) {
        return {res:false}
    } else {
        return {res:true}
    }
}    
module.exports = {
   schemaValidate
}*/
