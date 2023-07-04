const express = require("express");
const User = require("../Models/User.model.js");
const IsAdmin = require("../middleware/isAdmin.js");
const dotenv = require("dotenv");

dotenv.config();
const Router = express.Router();

Router.get("/", IsAdmin, async (req, res) => {
  res.json(await User.find());
});
Router.get("/:id", async (req, res) => {
  res.json(await User.findById(req.params.id));
});

module.exports = Router;
