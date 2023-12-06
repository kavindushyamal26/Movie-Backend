const express = require("express");
const router = express.Router();
const { Genre, validate } = require("../models/geners");

//GET
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const relavantGenre = await Genre.findById(req.params.id);
  if (!relavantGenre) res.status(404).send("genre not found");
  res.send(relavantGenre);
});

// POST
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }

  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

//PUT
router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(404).send(result.error.details[0].message);
  }

  const relavantGenre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  );
  if (!relavantGenre) return res.status(404).send("Genre not found");
  res.send(relavantGenre);
});

//DELETE
router.delete("/:id", async (req, res) => {
  const relavantGenre = await Genre.findByIdAndDelete(req.params.id);
  if (!relavantGenre) return res.status(404).send("Genre not found");

  res.send(relavantGenre);
});

module.exports = router;
