const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 25 },
  isGold: { type: Boolean, default: false },
  phone: { type: String, required: true, minlength: 3, maxlength: 25 },
});

const Customer = mongoose.model("Customer", customerSchema);

//JOI Validater
function validateCustomer(customer) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().min(3).required(),
  });
  return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
