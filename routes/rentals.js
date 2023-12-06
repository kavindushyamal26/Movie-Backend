const express = require("express");
const mongoose = require("mongoose");
const Fawn = require("fawn");
const router = express.Router();
const { Rental, validate } = require("../models/rentals");
const { Customer } = require("../models/customers");
const { Movie } = require("../models/movies");

Fawn.init("mongodb://localhost/new-vidly");

//GET
router.get("/", async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) res.status(404).send("Rental not found");
  res.send(rental);
});

// POST
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Invalid Customer..");

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send("Invalid Movie..");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });

  // try {
  //   await new Fawn.Task()
  //     .save("rentals", rental)
  //     .update(
  //       "movies",
  //       {
  //         _id: movie._id,
  //       },
  //       {
  //         $set: { numberInStock: -1 },
  //       }
  //     )
  //     .run();
  //   res.send(rental);
  // } catch (error) {
  //   console.log("err: ", error);
  //   res.status(500).send("Error..!");
  // }

  rental = await rental.save();
  movie.numberInStock--;
  movie.save();
  res.send(rental);
});

module.exports = router;
