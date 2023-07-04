const express = require("express");
const SettingsModel = require("../Models/Settings.model.js");
const IsAdmin = require("../middleware/isAdmin.js");

const { body, validationResult } = require("express-validator");
const Router = express.Router();
Router.get("/", async (req, res) => {
  res.json(await SettingsModel.findOne());
});

Router.put(
  "/",
  IsAdmin,
  body("currency").isObject(),
  body("tax").isObject(),
  body("deliveryFee").isNumeric(),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
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
module.exports = Router;
