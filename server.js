const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

dotenv.config();

const uri = process.env.DB_URI;

mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
  console.log("Database connected");
  app.use(cors());
  app.use(express.json());
  app.use("/api", routes);

  app.listen(5000, () => {
    console.log("Server has started at http://localhost:5000/");
  });
});
