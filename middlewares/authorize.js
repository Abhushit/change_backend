export default function (req, res, next) {
  // console.log("request logged in user >>", req.loggedInUser);

  if (req.loggedInUser.role !== "admin") {
    return next({
      msg: "Sorry, you do not have access",
      status: 403,
    });
  }
  next();
} 
