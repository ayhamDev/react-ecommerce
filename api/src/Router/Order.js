import express from "express";
import dotenv from "dotenv";
dotenv.config();
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("works");
});

export default Router;
