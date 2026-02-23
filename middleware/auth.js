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

export { restrictedToLoggedinUserOnly };
