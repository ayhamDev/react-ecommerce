import express from "express";
import CartModel from "../Models/Cart.model.js";
import IsAdmin from "../middleware/IsAdmin.js";
import IsSameUserOrAdmin from "../middleware/IsSameUserOrAdmin.js";
import dotenv from "dotenv";
import { body, validationResult } from "express-validator";
dotenv.config();
const Router = express.Router();

Router.get("/:id", IsSameUserOrAdmin, async (req, res) => {
  res.json(await CartModel.findOne({ userId: req.params.id }));
});
Router.put(
  "/:id",
  IsSameUserOrAdmin,
  body("products").isArray(),
  async (req, res) => {
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
              return { productId: product.id, quantity: product.quantity };
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
  }
);
Router.delete("/:id", IsSameUserOrAdmin, async (req, res) => {
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

export default Router;
