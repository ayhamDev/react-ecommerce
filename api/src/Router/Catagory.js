import express from "express";
import CatagoryModel from "../Models/Catagory.model.js";
import { body, validationResult } from "express-validator";
const Router = express.Router();

Router.get("/", async (req, res) => {
  res.json(await CatagoryModel.find());
});
Router.get("/:id", async (req, res) => {
  res.json(await CatagoryModel.findById(req.params.id));
});

Router.post("/", body("name").isString(), async (req, res) => {
  const results = validationResult(req);
  if (!results.isEmpty()) return res.json(results.array());

  const NewCatagory = new CatagoryModel({
    name: req.body.name,
  });
  NewCatagory.save()
    .then(() => {
      res.json(NewCatagory);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
export default Router;
