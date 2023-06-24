import express from "express";
import IsAdmin from "../middleware/IsAdmin.js";
import ImageModel from "../Models/Image.model.js";
import multer from "multer";
import dotenv from "dotenv";
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

Router.delete("/:id", IsAdmin, upload.single("image"), async (req, res) => {
  try {
    const NewImage = await ImageModel.findByIdAndDelete(req.params.id);
    return res.json({ id: NewImage.id });
  } catch (err) {
    return res.status(400).json(err);
  }
});

export default Router;
