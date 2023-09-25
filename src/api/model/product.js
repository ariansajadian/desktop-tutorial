const Joi = require('joi');

/// Schema Validate is not ready
 
async function productSchema(body) {
   const schema =  Joi.object().keys({ 
  title: Joi.string().required(),
  detail: Joi.string().required(),
  price: Joi.number().int().required(),
  category_id: {
    title:Joi.string().required()
  }
  });

  const {error} = schema.validate(body)
     
    if(error) {
        return {res:false}
    } else {
        return {res:true}
    }
}    
module.exports = {
   productSchema
}