import express from "express";
import SettingsModel from "../Models/Settings.model.js";
import IsAdmin from "../middleware/IsAdmin.js";

import { body, validationResult } from "express-validator";
const Router = express.Router();
Router.get("/", IsAdmin, async (req, res) => {
  res.json(await SettingsModel.findOne());
});

Router.put(
  "/",
  body("currency").isObject(),
  body("tax").isObject(),
  body("deliveryFee").isNumeric(),
  async (req, res) => {
    try {
      const Settings = await SettingsModel.findOne();
      Settings.currency = req.body.currency;
      Settings.tax = req.body.tax;
      Settings.deliveryFee = req.body.deliveryFee;
      try {
        res.json(await Settings.save());
      } catch (err) {
        res.status(400).json({ err });
      }
    } catch (err) {
      res.status(400).json({ err });
    }
  }
);
export default Router;
