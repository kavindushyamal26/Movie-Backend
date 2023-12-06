const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/users");

// POST
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password..!");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).send("Invalid Email or Password..!");

  // const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
  const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(50).email().required(),
    password: Joi.string().min(3).required(),
  });
  return schema.validate(req);
}

module.exports = router;
