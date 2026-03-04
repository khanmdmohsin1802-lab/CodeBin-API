import { getUser } from "../service/auth.js";

function restrictedToLoggedinUserOnly(req, res, next) {
  const userJwtId = req.cookies?.jwtId;

  if (!userJwtId) {
    return res.json({ error: "User not logged in" });
  }

  const user = getUser(userJwtId);

  if (!user) {
    return res.json({ error: "User not found" });
  }

  req.user = user;

  next();
}

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) {
      return res.status(401).json({ msg: "please log in first" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: "Forbidden: You do not have permission to perform this action",
      });
    }

    next();
  };
}

export { restrictedToLoggedinUserOnly, restrictTo };
