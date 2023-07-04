const express = require("express");
const CartModel = require("../Models/Cart.model.js");
const IsAdmin = require("../middleware/isAdmin.js");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const Router = express.Router();

Router.get("/:id", async (req, res) => {
  res.json(await CartModel.findOne({ userId: req.params.id }));
});
Router.put("/:id", body("products").isArray(), async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) return res.status(400).json(results.array());
  try {
    await CartModel.updateOne(
      {
        userId: req.params.id,
      },
      {
        $set: {
          products: req.body.products.map((product) => {
            return {
              productId: product.productId,
              quantity: product.quantity,
            };
          }),
        },
      },
      {
        new: true,
      }
    );
    res.json(await CartModel.findOne({ userId: req.params.id }));
  } catch (err) {
    res.json(err);
  }
});
Router.delete("/:id", async (req, res) => {
  try {
    await CartModel.updateOne(
      {
        userId: req.params.id,
      },
      {
        $set: {
          products: [],
        },
      },
      {
        new: true,
      }
    );
    res.json(await CartModel.findOne({ userId: req.params.id }));
  } catch (err) {
    res.json(err);
  }
});

Router.get("/", IsAdmin, async (req, res) => {
  res.json(await CartModel.find());
});

module.exports = Router;
