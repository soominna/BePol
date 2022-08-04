import { verifyToken } from "../controllers/functions/authentication/js";

export default (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (!accessToken) {
    res.status(401).send({ message: "Unauthorized user" });
  } else {
    const userdata = verifyToken(accessToken.split(" ")[1]);
    if (!userdata) {
      res.status(401).send({ message: "Invalid access token" });
    } else {
      next();
    }
  }
};
