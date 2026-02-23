import User from "../models/user.js";
import { setUser } from "../service/auth.js";
import bcrypt from "bcryptjs";

async function handleUserSignup(req, res) {
  try {
    console.log("INCOMING DATA:", req.body);

    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    res.status(201).json({ msg: "new User Created", user: newUser });
  } catch (error) {
    console.log("🚨 SIGNUP ERROR:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({ error: "Emai already exist" });
    }
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function handleUserLogin(req, res) {
  const { password } = req.body;
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({ msg: "No user found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Invalid email or password" });
  }

  const token = setUser(user);

  res.cookie("jwtId", token);
  return res.json({ msg: "Login sucessful", user: user, token: token });
}

export { handleUserSignup, handleUserLogin };
