export default function IsAuthenticated(req, res) {
  console.log(req.cookies);
  res.next();
}
