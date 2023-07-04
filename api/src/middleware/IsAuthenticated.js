const jwt = require("jsonwebtoken");
require("dotenv").config();
const UserModel = require("../Models/User.model.js");

module.exports = async function isAuthenticated(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader?.split(" ")[1])
    return res.status(403).json({ msg: "not authorized." });

  const Token = bearerHeader.split(" ")[1];
  try {
    const IsVerified = jwt.verify(Token, process.env.JWT_SECRET);
    if (!IsVerified) return res.status(403).json({ msg: "jwt is invaild" });
    const DecodedToken = jwt.decode(Token);
    try {
      req.user = await UserModel.findById(DecodedToken.userId);
      next();
    } catch (e) {
      return res.status(403).json({ msg: e });
    }
  } catch (e) {
    return res.status(403).json({ msg: e });
  }
};
