// const Joi = require("joi");
const helmet = require("helmet");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rental = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

// if (!config.get("jwtPrivateKey")) {
//   console.log("FATAL ERR: JWT not Available!");
//   process.exit(1);
// }

mongoose
  .connect("mongodb://localhost/new-vidly")
  .then(() => console.log("Connected to MongoDB...."))
  .catch((e) => console.error("Connection Failed...", e));

//Middleware
app.use(express.json());
app.use(helmet());
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rental);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3000, console.log("Listning port 3000"));
