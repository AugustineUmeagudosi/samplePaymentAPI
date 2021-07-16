const Joi = require('@hapi/joi');

module.exports = {
  createAdmin: (user) => {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      phone: Joi.string().required()      
    });  
    return schema.validate(user);
  },
  
  login: (user) => {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });  
    return schema.validate(user);
  }
};