const Joi = require('@hapi/joi');

module.exports = {
  makePayment: (subscription) => {
    const schema = Joi.object().keys({
      amount: Joi.number().required(),
      comment: Joi.number().optional().allow(null),
    });
  
    return schema.validate(subscription);
  }
};