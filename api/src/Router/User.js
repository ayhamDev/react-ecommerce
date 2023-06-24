import express from "express";
import User from "../Models/User.model.js";
import IsAdmin from "../middleware/IsAdmin.js";
import dotenv from "dotenv";
import IsSameUserOrAdmin from "../middleware/IsSameUserOrAdmin.js";

dotenv.config();
const Router = express.Router();

Router.get("/", IsAdmin, async (req, res) => {
  res.json(await User.find());
});
Router.get("/:id", IsSameUserOrAdmin, async (req, res) => {
  res.json(await User.findById(req.params.id));
});

export default Router;
