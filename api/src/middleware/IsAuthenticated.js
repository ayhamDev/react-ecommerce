import jwt from "jsonwebtoken";

export default function IsAuthenticated(req, res, next) {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader?.split(" ")[1])
    return res.status(403).json({ msg: "not authorized." });

  const Token = bearerHeader.split(" ")[1];
  try {
    const IsVerified = jwt.verify(Token, process.env.JWT_SECRET);
    if (!IsVerified) return res.status(403).json({ msg: "jwt is invaild" });
    req.user = jwt.decode(Token);
    next();
  } catch (e) {
    return res.status(403).json({ msg: e });
  }
}
