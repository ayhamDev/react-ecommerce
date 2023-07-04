const express = require("express");
const CatagoryModel = require("../Models/Catagory.model.js");
const Product = require("../Models/Product.model.js");
const isAdmin = require("../middleware/isAdmin.js");
const { body, validationResult } = require("express-validator");
const dotenv = require("dotenv");
const ProductModel = require("../Models/Product.model.js");
dotenv.config();
const Router = express.Router();

Router.get("/", async (req, res) => {
  const Catagories = await CatagoryModel.find();
  Promise.all(
    Catagories.map(async (Catagory) => {
      return {
        catagory: Catagory,
        length: (await ProductModel.find({ catagory: Catagory._id })).length,
      };
    })
  )
    .then((CatagoryProducts) => {
      res.json(CatagoryProducts);
    })
    .catch((err) => {
      res.status(500).json();
    });
});
Router.get("/:id", async (req, res) => {
  res.json(await CatagoryModel.findById(req.params.id));
});

Router.use(isAdmin);
Router.post(
  "/",
  body("name").isString().isLength({ min: 1 }),
  async (req, res) => {
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
  }
);
Router.put(
  "/:id",
  body("name").isString().isLength({ min: 1 }),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
    try {
      const DeletedCatagory = await CatagoryModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
          },
        }
      );
      res.json(DeletedCatagory);
    } catch (err) {
      res.status(401).json(err);
    }
  }
);
Router.delete("/:id", async (req, res) => {
  try {
    const DeletedCatagory = await CatagoryModel.findByIdAndDelete(
      req.params.id
    );
    const Products = await Product.find({ catagory: req.params.id });

    if (Products.length == 0) return res.json(DeletedCatagory);
    Promise.all(
      Products.map(async (product) => {
        return await Product.findByIdAndDelete(product._id);
      })
    )
      .then((value) => {
        res.json(DeletedCatagory);
      })
      .catch((err) => {
        res.status(400).json({ msg: err });
      });
  } catch (err) {
    res.status(401).json(err);
  }
});

module.exports = Router;
