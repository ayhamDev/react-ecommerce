import express from "express";
import Product from "../Models/Product.model.js";
import ImageModel from "../Models/Image.model.js";
import { body, validationResult } from "express-validator";
import IsAdmin from "../middleware/IsAdmin.js";
import dotenv from "dotenv";
dotenv.config();
const Router = express.Router();

Router.get("/", async (req, res) => {
  res.json(await Product.find().populate("catagory"));
});

Router.get("/:id", async (req, res) => {
  try {
    const FondProduct = await Product.findById(req.params.id).populate(
      "catagory"
    );
    res.json(FondProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

Router.use(IsAdmin);
Router.delete("/:id", async (req, res) => {
  try {
    const DeletedProduct = await Product.findByIdAndDelete(req.params.id);

    res.json(DeletedProduct);
  } catch (err) {
    res.status(401).json(err);
  }
});
Router.put(
  "/:id",
  body("title").isString().isLength({ min: 1 }),
  body("description").isString().isLength({ min: 1 }),
  body("price").isNumeric(),
  body("catagory").isString(),
  body("availability").isNumeric(),
  body("unit").isString(),
  body("images").isArray(),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            catagory: req.body.catagory,
            availability: req.body.availability,
            unit: req.body.unit,
            images: req.body.images.map((img) => {
              return img;
            }),
          },
        },
        { new: true }
      );

      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

Router.post(
  "/",
  body("title").isString().isLength({ min: 1 }),
  body("description").isString().isLength({ min: 1 }),
  body("price").isNumeric(),
  body("catagory").isString(),
  body("availability").isNumeric(),
  body("unit").isString(),
  body("images").isArray(),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
    const NewProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      catagory: req.body.catagory,
      availability: req.body.availability,
      unit: req.body.unit,

      images: req.body.images.map((img) => {
        return img;
      }),
    });
    NewProduct.save()
      .then((Product) => {
        res.json(Product);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

export default Router;
