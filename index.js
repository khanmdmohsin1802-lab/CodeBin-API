import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.js";
import snippetRoute from "./routes/snippet.js";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import ratelimit from "express-rate-limit";
import morgan from "morgan";
import logger from "./util/logger.js";

const app = express();

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGOURL)
    .then(() => console.log("✅ mongoose connected"))
    .catch((err) => console.log(err));
}

app.use(helmet());

const morganFormat =
  ":method :url :status :response-time ms - :res[content-length]";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

const limiter = ratelimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    error: "To many messages",
    msg: "You have been rate limited",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/snippet", snippetRoute);

const PORT = process.env.PORT;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () =>
    console.log("Running at port : http://localhost:8001"),
  );
}

export default app;
