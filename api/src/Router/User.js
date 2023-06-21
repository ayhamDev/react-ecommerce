import express from "express";
import User from "../Models/User.model.js";
const Router = express.Router();

Router.get("/", async (req, res) => {
  res.json(await User.find());
});
Router.get("/:id", async (req, res) => {
  res.json(await User.findById(req.params.id));
});

export default Router;
