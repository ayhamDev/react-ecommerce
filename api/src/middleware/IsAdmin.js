import jwt from "jsonwebtoken";

export default function IsAdmin(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader?.split(" ")[1])
    return res.status(403).json({ msg: "not authorized." });

  const Token = bearerHeader.split(" ")[1];
  try {
    const IsVerified = jwt.verify(Token, process.env.JWT_SECRET);
    if (!IsVerified) return res.status(403).json({ msg: "jwt is invaild" });
    const User = jwt.decode(Token);
    if (!User.IsAdmin) return res.status(403).json({ msg: "not admin." });
    req.admin = User;
    next();
  } catch (e) {
    return res.status(403).json({ msg: e });
  }
}
