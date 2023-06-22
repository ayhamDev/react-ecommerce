import express from "express";
import ProductModel from "../Models/Product.model.js";
import { body } from "express-validator";
const Router = express.Router();

Router.get("/", async (req, res) => {
  res.json(await ProductModel.find());
});

Router.get("/:id", async (req, res) => {
  res.json(await ProductModel.findById(req.params.id));
});

Router.post("/", async (req, res) => {});

export default Router;
