const express = require("express");
const User = require("../Models/User.model.js");
const Cart = require("../Models/Cart.model.js");

const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

require("dotenv").config();
const Router = express.Router();

Router.post("/", (req, res) => {
  res.send("fe");
});
Router.post(
  "/register",
  body("name").isString().isLength({ min: 3 }),
  body("email").isString().isEmail(),
  body("password").isStrongPassword(),
  body("phoneNo").isString(),
  body("address.city").isString(),
  body("address.lineOne").isString(),
  body("address.lineTwo").isString(),
  (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());
    bcrypt
      .hash(req.body.password, 10)
      .then((HashedPassword) => {
        const NewUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: HashedPassword,
          phoneNo: req.body.phoneNo,
          address: {
            city: req.body.address.city,
            lineOne: req.body.address.lineOne,
            lineTwo: req.body.address.lineTwo,
          },
        });

        NewUser.save()
          .then((user) => {
            const UserCart = new Cart({
              userId: NewUser.id,
            });
            UserCart.save()
              .then(() => {
                const accessToken = Jwt.sign(
                  { userId: user.id, admin: false },
                  process.env.JWT_SECRET,
                  { expiresIn: "1d" }
                );
                res.status(201).json({
                  User: NewUser,
                  accessToken,
                  admin: false,
                });
              })
              .catch((err) => {
                res.status(400).json(err);
              });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
);

Router.post(
  "/login",
  body("email").isString().isEmail(),
  body("password").isStrongPassword(),
  async (req, res) => {
    const results = validationResult(req);
    if (!results.isEmpty()) return res.status(400).json(results.array());

    const FoundUser = await User.findOne({ email: req.body.email });
    if (!FoundUser)
      return res.status(404).json({ msg: "No User Found With That Email." });

    // Hash The Password To Compare it with the Requested One

    // Compare Them
    bcrypt.compare(req.body.password, FoundUser.password, (err, same) => {
      if (err) return res.status(400).json(err);
      if (!same) return res.status(400).json({ msg: "Incorrect Password." });
      const accessToken = Jwt.sign(
        { userId: FoundUser.id, admin: false },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(201).json({
        User: FoundUser,
        accessToken,
        admin: false,
      });
    });
  }
);
Router.post(
  "/admin",
  body("email").isEmail(),
  body("password").isString(),
  (req, res) => {
    if (
      process.env.ADMIN_EMAIL !== req.body.email ||
      process.env.ADMIN_PASSWORD !== req.body.password
    )
      return res.status(403).json({ msg: "Incorrect Email or Password" });
    const accessToken = Jwt.sign(
      { email: process.env.ADMIN_EMAIL, admin: true },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );
    res.status(201).json({
      User: { email: process.env.ADMIN_EMAIL },
      accessToken,
      admin: true,
    });
  }
);
module.exports = Router;
