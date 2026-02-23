import User from "../models/user.js";
import { setUser } from "../service/auth.js";

async function handleUserSignup(req, res) {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ msg: "new User Created", user: newUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "Emai already exist" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (!user) {
    return res.status(401).json({ msg: "No user found" });
  }

  const token = setUser(user);

  res.cookie("jwtId", token);
  return res.json({ msg: "Login sucessful", user: user, token: token });
}

export { handleUserSignup, handleUserLogin };
