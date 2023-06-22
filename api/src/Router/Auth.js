import express from "express";
import User from "../Models/User.model.js";
import Cart from "../Models/Cart.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const Router = express.Router();

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
    if (!results.isEmpty()) return res.json(results.array());
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
                const AccessToken = Jwt.sign(
                  { userId: user.id, email: user.email },
                  process.env.JWT_SECRET
                );
                res.status(201).json({
                  User: NewUser,
                  AccessToken,
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
    if (!results.isEmpty()) return res.json(results.array());

    const FoundUser = await User.findOne({ email: req.body.email });
    if (!FoundUser)
      return res.status(404).json({ msg: "No User Found With That Email." });

    // Hash The Password To Compare it with the Requested One

    // Compare Them
    bcrypt.compare(req.body.password, FoundUser.password, (err, same) => {
      if (err) return res.status(400).json(err);
      if (!same) return res.status(400).json({ msg: "Incorrect Password." });
      const AccessToken = Jwt.sign(
        { userId: FoundUser.id, email: FoundUser.email },
        process.env.JWT_SECRET
      );
      res.status(201).json({
        User: FoundUser,
        AccessToken,
      });
    });
  }
);
export default Router;
