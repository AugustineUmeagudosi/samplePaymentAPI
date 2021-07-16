const Joi = require('@hapi/joi');

module.exports = {
  makePayment: (subscription) => {
    const schema = Joi.object().keys({
      amount: Joi.number().required(),
      currency: Joi.string().optional().allow(null),
    });
  
    return schema.validate(subscription);
  }
};