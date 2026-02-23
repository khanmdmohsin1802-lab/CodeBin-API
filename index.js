import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import snippetRoute from "./routes/snippet.js";
import cookieParser from "cookie-parser";
const app = express();

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("✅ mongoose connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/snippet", snippetRoute);

const PORT = process.env.PORT
app.listen(PORT, () => console.log("Running at port : http://localhost:8001"));
