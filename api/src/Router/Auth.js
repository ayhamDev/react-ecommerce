import express from "express";
const Router = express.Router();

Router.get("/", (req, res) => {
  res.send("works");
});

export default Router;
