import jwt from "jsonwebtoken";
import UsersModel from "../src/users/users.model.js";

export default function (req, res, next) {
  let token;
  if (req.headers["authorization"]) token = req.headers["authorization"];
  if (req.headers["x-access-token"]) token = req.headers["x-access-token"];
  if (req.headers["token"]) token = req.headers["token"];
  if (req.query.headers) token = req.query.token;

  if (token) {
    //validation
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return err;
      }
      UsersModel.findById(decoded._id, function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return next({
            msg: "User removed from system",
            status: 400,
          });
        }
        req.loggedInUser = user;
        next();
      });
    });
  } else {
    return next({
      msg: "Token not provided",
      status: 400,
    });
  }
}
