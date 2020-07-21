require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const mongoURI = require("./config/config");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const storeRouter = require("./routes/storeRouter");
const cartRouter = require("./routes/cartRouter");
const paymentRouter = require("./routes/paymentRouter");
const stripeAuthRouter = require("./authentication/stripeStrategy");
const orderRouter = require("./routes/orderRouter");
const session = require("express-session");

const server = express();
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
const cookieConfig = {
  secret: process.env.COOKIE_SECRET || "BOOPGOESBLOOP",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 604800000),
    //TODO: switch secure to true if you are not using Postman!
    secure: false, // set to true if your using https
    httpOnly: true,
  },
};
server.use(session(cookieConfig));

server.use(
  cors({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": ["OPTIONS", "GET", "PUT", "POST", "DELETE"],
    "Access-Control-Allow-Credentials": true,
  })
);
server.use(cookieParser(process.env.COOKIE_SECRET));

server.use("/api/auth", authRouter);
server.use("/api/store", productRouter);
server.use("/api/store", storeRouter);
server.use("/api/store", cartRouter);
server.use("/api/store", orderRouter);
server.use("/api/stripe/payment", paymentRouter);
server.use("/api/auth/stripe", stripeAuthRouter);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

server.use(express.static(path.join(__dirname, "public")));
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "pug");

mongoose
  .connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    console.log("Mongo is connected")
  )
  .catch((err) => Promise.reject(new Error("woops", err)));

server.get("/", (req, res) => {
  console.log(req.session);
  res.status(200).send("Api is running!!");
});

server.all("*", (req, res) => {
  res.status(404).json({ message: "This URL can not be found" });
});

module.exports = { server, cookieConfig };
