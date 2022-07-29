import { decodeToken } from "../controllers/functions/authentication/js";

export default (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    res.status(401).send({ message: "Unauthorized user" });
  } else {
    const userdata = decodeToken(accessToken);
    if (!userdata) {
      res.status(401).send({ message: "Invalid access token" });
    } else {
      next();
    }
  }
};
