const express = require("express");
const IsAdmin = require("../middleware/isAdmin.js");
const ImageModel = require("../Models/Image.model.js");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const imageTypes = ["image/jpeg", "image/png"];

const storage = multer.memoryStorage();
const upload = multer({ storage });
const Router = express.Router();
Router.get("/:id", async (req, res) => {
  try {
    const ImageRef = await ImageModel.findById(req.params.id);
    res.writeHead(200, {
      "Content-Type": ImageRef.mimetype,
      "Content-Length": ImageRef.size,
    });
    res.end(ImageRef.buffer);
  } catch (err) {
    return res.status(400).json(err);
  }
});

Router.post("/", IsAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ msg: "undefind file" });
  if (!imageTypes.includes(req.file.mimetype))
    return res.status(400).json({ msg: "invaild Image Format" });
  const NewImage = new ImageModel(req.file);
  NewImage.save()
    .then(() => {
      return res.json({ id: NewImage.id });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
});

Router.delete("/:id", IsAdmin, async (req, res) => {
  try {
    const deletedImage = await ImageModel.findByIdAndDelete(req.params.id);
    return res.json({ id: deletedImage.id });
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = Router;
