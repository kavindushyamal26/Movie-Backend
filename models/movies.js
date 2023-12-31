const mongoose = require("mongoose");
const Joi = require("joi");
const { genreSchema } = require("./geners");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
  },
  genre: {
    type: genreSchema,
    require: true,
  },
  numberInStock: { type: Number, required: true, min: 0, max: 25 },
  dailyRentalRate: {
    type: Number,
    required: true,
    min: 0,
    max: 25,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

//JOI Validater
function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
