import express from "express";
import ImageModel from "../Models/Image.model.js";
const Router = express.Router();
import multer from "multer";
const imageTypes = ["image/jpeg", "image/png"];
const storage = multer.memoryStorage();
const upload = multer({ storage });

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

Router.post("/", upload.single("image"), (req, res) => {
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

Router.delete("/:id", upload.single("image"), async (req, res) => {
  try {
    const NewImage = await ImageModel.findByIdAndDelete(req.params.id);
    return res.json({ id: NewImage.id });
  } catch (err) {
    return res.status(400).json(err);
  }
});

export default Router;
